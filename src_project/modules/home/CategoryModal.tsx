import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from "react"
import { View, StyleSheet, Modal, TouchableOpacity, Text, Image, StatusBar, Dimensions, LayoutAnimation } from "react-native"

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Props = {
    categoryList: Category[]
}

export interface CategoryModalRef {
    show: () => void
    hide: () => void
}

import icon_arrow from '../../assets/icon_arrow.png';
import icon_delete from '../../assets/icon_delete.png';
import { save } from "../../utils/Storage";

// 使用forwardRef进行ref转发
export default forwardRef<CategoryModalRef, any>((props: Props, ref) => {

    const { categoryList } = props

    const [visible, setVisible] = useState<boolean>(false)

    const [edit, setEdit] = useState<boolean>(false)

    const [myList, setMyList] = useState<Category[]>([])
    const [otherList, setOtherList] = useState<Category[]>([])

    useEffect(() => {
        if (!categoryList) {    //增加一个判空处理
            return;
        }
        const list1 = categoryList.filter(i => i.isAdd);
        const list2 = categoryList.filter(i => !i.isAdd);

        setMyList(list1);
        setOtherList(list2);
    }, [categoryList])

    const hide = () => {
        setVisible(false)
    }

    const show = () => {
        setVisible(true)
    }

    useImperativeHandle<CategoryModalRef, any>(ref, () => {
        return {
            show: show,
            hide: hide
        }
    })

    //使用useCallback，并结合高阶函数
    //useCallback接受两个参数：回调函数和依赖数组。当依赖数组中的变量发生变化时，才会重新创建新的回调函数。
    //如果依赖数组为空，则表示回调函数不依赖任何变量，将始终返回相同的函数引用。
    const onMyItemPress = useCallback((item: Category, index: number) => () => {
        if (!edit) {
            return
        }
        const newMylist = myList.filter(i => i.name != item.name)
        const copy = { ...item, isAdd: false }
        const newOtherList = [...otherList, copy];  //数组拼接
        LayoutAnimation.easeInEaseOut();    //开启布局动画
        setMyList(newMylist);
        setOtherList(newOtherList);
    }, [edit, myList, otherList])

    const onOtherItemPress = useCallback((item: Category, index: number) => () => {
        if (!edit) {
            return;
        }

        const newOtherList = otherList.filter(i => i.name !== item.name);
        const copy = { ...item, isAdd: true };
        const newMyList = [...myList, copy]

        LayoutAnimation.easeInEaseOut();
        setMyList(newMyList);
        setOtherList(newOtherList);
    }, [edit, myList, otherList]);

    const renderMyList = () => {
        return <>
            <View style={styles.row}>
                <Text style={styles.titleTxt}>我的频道</Text>
                <Text style={styles.subTitleTxt}>点击进入频道</Text>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                        if (edit) {
                            save("categoryList", JSON.stringify([...myList, ...otherList])) //如果是编辑状态，先保存
                        }
                        setEdit(!edit)
                    }}
                >
                    <Text style={styles.editTxt}>{edit ? '完成编辑' : '进入编辑'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={hide}
                >
                    <Image style={styles.closeImg} source={icon_arrow} />
                </TouchableOpacity>
            </View>

            <View style={styles.listContent}>
                {
                    myList.map((item: Category, index: number) => {
                        return <TouchableOpacity
                            key={`${item.name}`}    // map下，需要增加key 
                            style={item.default ? styles.itemLayoutDefault : styles.itemLayout}
                            onPress={onMyItemPress(item, index)}
                        >
                            <Text style={styles.itemTxt}>{item.name}</Text>
                            {edit && !item.default && <Image style={styles.deleteImg} source={icon_delete} />}
                        </TouchableOpacity>
                    })
                }
            </View>
        </>
    }

    const renderOtherList = () => {
        return <>
            <View style={[styles.row, { marginTop: 32 }]}>
                <Text style={styles.titleTxt}>推荐频道</Text>
                <Text style={styles.subTitleTxt}>点击添加频道</Text>
            </View>

            <View style={styles.listContent}>
                {
                    otherList.map((item: Category, index: number) => {
                        return <TouchableOpacity
                            key={`${item.name}`}    // map下，需要增加key 
                            style={item.default ? styles.itemLayoutDefault : styles.itemLayout}
                            onPress={onOtherItemPress(item, index)}
                        >
                            <Text style={styles.itemTxt}>{item.name}</Text>
                            {edit && !item.default && <Image style={styles.deleteImg} source={icon_delete} />}
                        </TouchableOpacity>
                    })
                }
            </View>
        </>
    }

    return <Modal
        transparent={true}  //设置背景透明
        visible={visible}
        statusBarTranslucent={true}
        animationType="fade"
        onRequestClose={hide}
    >
        <View style={styles.root}>
            <View style={styles.content} >
                {renderMyList()}
                {renderOtherList()}
            </View>
            <View style={styles.mask}>
            </View>
        </View>
    </Modal>

})

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: '100%',
        backgroundColor: 'transparent', //背景设置为透明
    },
    content: {
        width: '100%',
        backgroundColor: 'white',
        marginTop: 48 + (StatusBar.currentHeight || 0), //获取当前状态栏的高度
        paddingBottom: 40,
    },
    mask: {
        width: '100%',
        flex: 1,
        backgroundColor: '#00000060',
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleTxt: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginLeft: 16,
    },
    subTitleTxt: {
        fontSize: 13,
        color: '#999',
        marginLeft: 12,
        flex: 1,
    },
    editButton: {
        paddingHorizontal: 10,
        height: 28,
        backgroundColor: '#EEE',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editTxt: {
        fontSize: 13,
        color: '#3050ff',
    },
    closeButton: {
        padding: 16,
    },
    closeImg: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        transform: [{ rotate: '90deg' }]
    },
    listContent: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: "wrap" //设置当展示不下的时候，换行展示
    },
    itemLayout: {
        width: SCREEN_WIDTH - 80 >> 2,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 6,
        marginLeft: 16,
        marginTop: 12,
    },
    itemLayoutDefault: {
        width: SCREEN_WIDTH - 80 >> 2, //除以4
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 6,
        marginLeft: 16,
        marginTop: 12,
    },
    itemTxt: {
        fontSize: 16,
        color: '#666',
    },
    deleteImg: {
        width: 16,
        height: 16,
        position: 'absolute',
        top: -6,
        right: -6,
    },
})