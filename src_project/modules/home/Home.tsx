import React, { useEffect, useCallback, useLayoutEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native'

import { useLocalStore, observer } from 'mobx-react';
import HomeStore from './HomeSore';
import ResizeImage from '../../components/ResizeImage';
import FlowList from "../../components/flowlist/FlowList.js"
import Heart from '../../components/Heart';
import TitleBar from './TitleBar';
import CategoryList from './CategoryList';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { checkUpdate, downloadUpdate, switchVersion, switchVersionLater, isFirstTime, markSuccess, isRolledBack } from 'react-native-update';
import _updateConfig from '../../../update.json';
import { save } from '../../utils/Storage';
import { useLayout } from '@react-native-community/hooks';

const { width: SCREEN_WIDTH } = Dimensions.get("window")    //重命名成SCREEN_WIDTH

const { appKey } = _updateConfig[Platform.OS];

//这里要添加观察者
export default observer(() => {

    const store = useLocalStore(() => new HomeStore())

    // 函数组件默认是没有 navigation 对象的
    // 当函数组件通过 Stack.Screen 生成页面时，才会有 navigation 对象
    const navigation = useNavigation<StackNavigationProp<any>>();

    // 在初始化时，为了页面不抖动，必须使用同步的方法渲染页面
    // 更新单个界面的navigation的Options
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [navigation])

    useEffect(() => {
        store.requestHomeList()
        store.getCategroyList()

        //Pushy只能在正式环境中
        if (!__DEV__) {
            //检查热更新
            checkPatch()

            if (isFirstTime) {  //在每次更新完毕后的首次启动时，isFirstTime常量会为true
                markSuccess();  //在应用退出前合适的任何时机，调用markSuccess，否则应用下一次启动的时候将会进行回滚操作
                // 补丁成功，上报服务器信息
                // 补丁安装成功率：99.5% ~ 99.7%
            } else if (isRolledBack) {
                // 补丁回滚，上报服务器信息
            }
        }
    }, [])

    // 检查补丁更新
    const checkPatch = async () => {
        // 返回的info有三种情况：
        // {expired: true}：该应用原生包已过期
        // {upToDate: true}：当前已经更新到最新，无需进行更新
        // {update: true}：当前有新版本可以更新
        const info: any = await checkUpdate(appKey);
        const { update, name, description, metaInfo } = info;
        if (update) {   //如果有更新
            const hash = await downloadUpdate(
                info,
                {
                    onDownloadProgress: ({ received, total }) => { },
                },
            );
            if (hash) { //如果这个hash不为空
                const metaJson = JSON.parse(metaInfo);  //将string转换为对象
                save('patchVersion', name); //保存版本信息
                const { forceUpdate } = metaJson;
                if (forceUpdate) {  //是否强制更新
                    Alert.alert('提示', '下载完毕,是否重启应用?', [
                        {
                            text: '是',
                            onPress: () => {
                                switchVersion(hash);
                            },
                        },
                        { text: '否' },
                        {
                            text: '下次启动时',
                            onPress: () => {
                                switchVersionLater(hash);
                            },
                        },
                    ]);
                } else {
                    switchVersionLater(hash);
                }
            }
        }
    }

    const refreshNewData = () => {
        store.resetPage()
        store.requestHomeList()
    }

    const loadMoreData = () => {
        store.requestHomeList()
    }

    const onArticlePress = useCallback((item: ArticleSimple) => () => {
        navigation.push("ArticleDetail", { id: item.id })   //通过这种方式传值
    }, [])

    const renderItem = ({ item }: { item: ArticleSimple }) => {
        return <TouchableOpacity
            onPress={
                onArticlePress(item)
            }
            style={styles.item}>
            <ResizeImage uri={item.avatarUrl} />
            <Text style={styles.titleTxt}>{item.title}</Text>
            <View style={styles.nameLayout}>
                <Image style={styles.avatarImg} source={{ uri: item.avatarUrl }} />
                <Text style={styles.nameTxt}>{item.userName}</Text>
                <Heart value={item.isFavorite} onValueChanged={(value: boolean) => {

                }}></Heart>
            </View>
        </TouchableOpacity>
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