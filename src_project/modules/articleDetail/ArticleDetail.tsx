import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native'
import { useLocalStore } from 'mobx-react';
import ArticleDetailStore from "./ArticleDetailStore";
import { observer } from 'mobx-react';
import { RouteProp, useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ImageSlider } from "../../components/slidePager";
import UserStore from "../../stores/UserStore";
import dayjs from "dayjs";
import Heart from "../../components/Heart";

import icon_arrow from '../../assets/icon_arrow.png';
import icon_share from '../../assets/icon_share.png';
import icon_collection from '../../assets/icon_collection.png';
import icon_collection_selected from '../../assets/icon_collection_selected.png';
import icon_comment from '../../assets/icon_comment.png'
import icon_edit_comment from '../../assets/icon_edit_comment.png';

//定义传值的泛型
type RouteParams = {
    ArticleDetail: {
        id: number;
    }
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

//为了取消警告，Image组件的uri要进行判空处理

export default observer(() => {

    const store = useLocalStore(() => new ArticleDetailStore());

    //使用useRoute来获取上一个界面的传值
    //route 对象和 navigation 对象类似，函数组件默认是没有这两个对象的。
    //当你使用 Stack.Screen 创建页面时，用来创建页面的函数组件就会同时获取到 navigation 对象和 route 对象。
    //其中 navigation 对象的主要作用是跳转，route 对象的主要作用是携带自定义参数。
    const { params } = useRoute<RouteProp<RouteParams, 'ArticleDetail'>>();

    const navigation = useNavigation<StackNavigationProp<any>>();

    const [height, setHeight] = useState<number>(400);

    useEffect(() => {
        store.requestArticleDetail(params.id);
    }, []);

    //获取图片的高度
    useEffect(() => {
        if (!store.detail?.images) {
            return;
        }
        const firstImg = store.detail?.images[0];
        Image.getSize(firstImg, (width: number, height: number) => {
            const showHeight = SCREEN_WIDTH * height / width;
            setHeight(showHeight);
        })
    }, [store.detail?.images]);

    const renderTitle = () => {
        const { detail } = store;
        return (
            <View style={styles.titleLayout}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.pop()}
                >
                    <Image style={styles.backImg} source={icon_arrow} />
                </TouchableOpacity>
                {!!detail.avatarUrl && <Image style={styles.avatarImg} source={{ uri: detail.avatarUrl }} />}
                <Text style={styles.userNameTxt}>{detail.userName}</Text>
                <Text style={styles.followTxt}>关注</Text>
                <Image style={styles.shareImg} source={icon_share} />
            </View>
        );
    }

    //轮播图
    const renderImages = () => {
        const { detail } = store;
        const { images } = detail;
        if (!images?.length) {
            return null;
        }
        const data: any[] = images.map(i => {
            return { img: i };
        })
        return (
            <View style={{ paddingBottom: 30 }} >
                <ImageSlider
                    data={data}
                    autoPlay={false}
                    closeIconColor='white'
                    caroselImageStyle={{ height }}
                    indicatorContainerStyle={{ bottom: -40, }}
                    activeIndicatorStyle={styles.activeDot}
                    inActiveIndicatorStyle={styles.inActiveDot}
                />
            </View>
        );
    }

    const renderInfo = () => {
        const { detail } = store;
        // join：将array数据中每个元素都转为字符串,用自定义的连接符分割
        const tags = detail.tag?.map(i => `# ${i}`).join(' ');  //这里是为每一个标签前加#
        return (
            <>
                <Text style={styles.articleTitleTxt}>{detail.title}</Text>
                <Text style={styles.descTxt}>{detail.desc}</Text>
                <Text style={styles.tagsTxt}>{tags}</Text>
                <Text style={styles.timeAndLocationTxt}>{detail.dateTime}  {detail.location}</Text>
                <View style={styles.line} />
            </>
        );
    }

    const renderComments = () => {
        const { detail } = store;
        const count = detail.comments?.length || 0; //这里都要做空处理
        const { userInfo } = UserStore;

        const styles = StyleSheet.create({
            commentsCountTxt: {
                fontSize: 14,
                color: '#666',
                marginTop: 20,
                marginLeft: 16,
            },
            inputLayout: {
                width: '100%',
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
            },
            userAvatarImg: {
                width: 32,
                height: 32,
                borderRadius: 16,
                resizeMode: 'cover',
            },
            commentInput: {
                flex: 1,
                height: 32,
                borderRadius: 16,
                marginLeft: 12,
                backgroundColor: '#f0f0f0',
                fontSize: 14,
                color: '#333',
                textAlignVertical: 'center',
                paddingVertical: 0,
                paddingHorizontal: 12,
            },
            commentsContainer: {
                paddingHorizontal: 16,
                paddingTop: 16,
                paddingBottom: 32,
            },
            commentItem: {
                width: '100%',
                flexDirection: 'row',
            },
            cAvatar: {
                width: 36,
                height: 36,
                resizeMode: 'cover',
                borderRadius: 18,
            },
            contentLayout: {
                flex: 1,
                marginHorizontal: 12,
            },
            nameTxt: {
                fontSize: 12,
                color: '#999',
            },
            messageTxt: {
                fontSize: 14,
                color: '#333',
                marginTop: 6,
            },
            timeLocationTxt: {
                fontSize: 12,
                color: '#bbb',
            },
            countLayout: {
                alignItems: 'center',
            },
            fCount: {
                fontSize: 12,
                color: '#666',
                marginTop: 2,
            },
            divider: {
                marginLeft: 50,
                marginRight: 0,
                height: StyleSheet.hairlineWidth,   //默认的分割线
                backgroundColor: '#eee',
                marginVertical: 16,
            },
        });

        //使用了dayjs的日期库
        return (
            <>
                <Text style={styles.commentsCountTxt}>
                    {count ? `共 ${count} 条评论` : '暂无评论'}
                </Text>
                <View style={styles.inputLayout}>
                    {!!userInfo.avatar && <Image style={styles.userAvatarImg} source={{ uri: userInfo.avatar }} />}
                    <TextInput
                        style={styles.commentInput}
                        placeholder='说点什么吧，万一火了呢～'
                        placeholderTextColor={'#bbb'}
                    />
                </View>

                {!!count && <View style={styles.commentsContainer}>
                    {detail.comments?.map((i: ArticleComment, index: number) => {
                        return (
                            <View key={`${index}`}>
                                <View style={styles.commentItem}>
                                    {
                                        !!i.avatarUrl &&
                                        <Image
                                            style={styles.cAvatar}
                                            source={{ uri: i.avatarUrl }}
                                        />
                                    }

                                    <View style={styles.contentLayout}>
                                        <Text style={styles.nameTxt}>{i.userName}</Text>
                                        <Text style={styles.messageTxt}>
                                            {i.message}
                                            <Text style={styles.timeLocationTxt}>
                                                {dayjs(i.dateTime).format('MM-DD')}  {i.location}
                                            </Text>
                                        </Text>

                                        {   //自评论的方式，这个小心心按钮不能点击，即使使用absoult方式，也不行，说明布局初始就是有问题的

                                            !!i.children?.length &&
                                            i.children.map((j: ArticleComment, subIndex: number) => {
                                                return (
                                                    <View
                                                        key={`${index}-${subIndex}`}
                                                        style={[styles.commentItem, { marginTop: 12, width: SCREEN_WIDTH - 80 }]}
                                                    >
                                                        {
                                                            !!j.avatarUrl && <Image
                                                                style={[styles.cAvatar, { width: 32, height: 32, }]}
                                                                source={{ uri: j.avatarUrl }}
                                                            />
                                                        }

                                                        <View style={styles.contentLayout}>
                                                            <Text style={styles.nameTxt}>{j.userName}</Text>
                                                            <Text style={styles.messageTxt}>
                                                                {j.message}
                                                                <Text style={styles.timeLocationTxt}>
                                                                    {dayjs(j.dateTime).format('MM-DD')}  {j.location}
                                                                </Text>
                                                            </Text>
                                                        </View>

                                                        <View style={styles.countLayout}>
                                                            <Heart size={20} value={j.isFavorite} />
                                                            <Text style={styles.fCount}>{j.favoriteCount}</Text>
                                                        </View>
                                                    </View>
                                                );
                                            })
                                        }
                                    </View>

                                    <View style={styles.countLayout}>
                                        <Heart size={20} value={i.isFavorite} />
                                        <Text style={styles.fCount}>{i.favoriteCount}</Text>
                                    </View>
                                </View>

                                <View style={styles.divider} />
                            </View>
                        );
                    })}
                </View>}
            </>
        );
    }

    const renderBottom = () => {
        const { detail } = store;
        return (
            <View style={styles.bottomLayout}>
                <View style={styles.bottomEditLayout}>
                    <Image style={styles.editImg} source={icon_edit_comment} />
                    <TextInput
                        style={styles.bottomCommentInput}
                        placeholder='说点什么'
                        placeholderTextColor={'#333'}
                    />
                </View>
                <Heart
                    size={30}
                    value={detail.isFavorite}
                />
                <Text style={styles.bottomCount}>
                    {detail.favoriteCount}
                </Text>

                <Image
                    style={styles.bottomIcon}
                    source={detail.isCollection ? icon_collection_selected : icon_collection}
                />
                <Text style={styles.bottomCount}>
                    {detail.collectionCount}
                </Text>

                <Image
                    style={styles.bottomIcon}
                    source={icon_comment}
                />
                <Text style={styles.bottomCount}>
                    {detail.comments?.length || 0}
                </Text>
            </View>
        );
    }

    return store.detail ? (
        <View style={styles.root}>
            {renderTitle()}
            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
            >
                {renderImages()}
                {renderInfo()}
                {renderComments()}
            </ScrollView>
            {renderBottom()}
        </View>
    ) : null;
})

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    titleLayout: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        paddingHorizontal: 16,
        height: '100%',
        justifyContent: 'center',
    },
    backImg: {
        width: 20,
        height: 20,
    },
    avatarImg: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 20,
    },
    userNameTxt: {
        fontSize: 15,
        flex: 1,
        color: '#333',
        marginLeft: 16,
    },
    followTxt: {
        paddingHorizontal: 16,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ff2442',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 12,
        color: '#ff2442',
    },
    shareImg: {
        width: 28,
        height: 28,
        marginHorizontal: 16,
    },
    activeDot: {
        width: 6,
        height: 6,
        backgroundColor: '#ff2442',
        borderRadius: 3,
    },
    inActiveDot: {
        width: 6,
        height: 6,
        backgroundColor: '#c0c0c0',
        borderRadius: 3,
    },
    articleTitleTxt: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
        paddingHorizontal: 16,
    },
    descTxt: {
        fontSize: 15,
        color: '#333',
        marginTop: 6,
        paddingHorizontal: 16,
    },
    tagsTxt: {
        fontSize: 15,
        color: '#305090',
        marginTop: 6,
        paddingHorizontal: 16,
    },
    timeAndLocationTxt: {
        fontSize: 12,
        color: '#bbb',
        marginVertical: 16,
        marginLeft: 16,
    },
    line: {
        marginHorizontal: 16,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#eee',
    },
    bottomLayout: {
        width: '100%',
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    bottomEditLayout: {
        height: 40,
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginRight: 12,
    },
    editImg: {
        width: 20,
        height: 20,
        tintColor: '#333',
    },
    bottomCommentInput: {
        height: '100%',
        fontSize: 16,
        color: '#333',
        textAlignVertical: 'center',
        paddingVertical: 0,
    },
    bottomCount: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    bottomIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginLeft: 12,
    },
});
