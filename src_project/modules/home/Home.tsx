import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native'

import { useLocalStore, observer } from 'mobx-react';
import HomeStore from './HomeSore';
import ResizeImage from '../../components/ResizeImage';
import FlowList from "../../components/flowlist/FlowList.js"
import Heart from '../../components/Heart';
import TitleBar from './TitleBar';
import CategoryList from './CategoryList';

const { width: SCREEN_WIDTH } = Dimensions.get("window")    //重命名成SCREEN_WIDTH

//这里要添加观察者
export default observer(() => {

    const store = useLocalStore(() => new HomeStore())

    useEffect(() => {
        store.requestHomeList()
        store.getCategroyList()
    }, [])

    const refreshNewData = () => {
        store.resetPage()
        store.requestHomeList()
    }

    const loadMoreData = () => {
        store.requestHomeList()
    }

    const renderItem = ({ item }: { item: ArticleSimple }) => {
        return <View style={styles.item}>
            <ResizeImage uri={item.avatarUrl} />
            <Text style={styles.titleTxt}>{item.title}</Text>
            <View style={styles.nameLayout}>
                <Image style={styles.avatarImg} source={{ uri: item.avatarUrl }} />
                <Text style={styles.nameTxt}>{item.userName}</Text>
                <Heart value={item.isFavorite} onValueChanged={(value: boolean) => {

                }}></Heart>
            </View>
        </View>
    }

    const Foorer = () => {
        return <Text style={styles.footerTxt}>没有更多数据</Text>
    }

    const categoryList: () => Category[] = () => {
        return store.categoryList.filter(categroy => categroy.isAdd)
    }

    // const categoryList = store.categoryList.filter(i => i.isAdd);


    return (
        <View style={styles.root}>

            <TitleBar tab={1} onTabChanged={(tabIndex: number) => {

            }} />

            <FlowList
                style={styles.flatList}
                data={store.homeList}
                keyExtractor={(item: ArticleSimple) => `${item.id}`}
                extraData={[store.refreshing]}  //如果有除data以外的数据用在列表中（不论是用在renderItem还是头部或者尾部组件中），请在此属性中指定
                renderItem={renderItem}
                numColumns={2}  //最多支持两列
                refreshing={store.refreshing}
                onRefresh={refreshNewData}
                onEndReachedThreshold={0.1} //距离底部还有多少的时候刷新
                onEndReached={loadMoreData}
                ListFooterComponent={<Foorer />}
                ListHeaderComponent={
                    <CategoryList
                        categoryList={categoryList()}
                        allCategoryList={store.categoryList}
                        onCategoryChange={(category: Category) => {

                        }}
                    />
                }
            />
        </View>
    );
})

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#f0f0f0"
    },
    flatList: {
        width: "100%",
        height: "100%",
    },
    item: {
        width: SCREEN_WIDTH - 18 >> 1,   //减去item左右的空隙，除以2，就是每一个item的高度
        backgroundColor: "white",
        marginLeft: 6,
        marginBottom: 6,
        borderRadius: 8,
        overflow: "hidden"
    },
    titleTxt: {
        fontSize: 14,
        color: '#333',
        marginHorizontal: 10,
        marginVertical: 4,
    },
    nameLayout: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    avatarImg: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    nameTxt: {
        fontSize: 12,
        color: "#999",
        marginLeft: 6,
        flex: 1
    },
    footerTxt: {
        width: '100%',
        fontSize: 14,
        color: '#999',
        marginVertical: 16,
        textAlign: 'center',
        textAlignVertical: 'center',
    }
})