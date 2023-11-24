import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, Button, View, Animated, Easing, Image, LayoutAnimation, ToastAndroid, TouchableOpacity } from "react-native";

import icon_avatar from '../assets/images/default_avatar.png';

import icon_gift from '../assets/images/icon_gift.png';
import icon_mine from '../assets/images/icon_mine.png';
import icon_home from '../assets/images/icon_home.png';
import icon_show from '../assets/images/icon_show.png';

//支持动画的组件 
// Animated.Image Animated.View Animated.Text 
// Animated.ScrollView Animated.FlatList Animated.SectionList
export default () => {

    //动画引用
    const marginLeft = useRef<Animated.Value>(new Animated.Value(5)).current

    const rotate = useRef<Animated.Value>(new Animated.Value(0)).current

    const scale = useRef<Animated.Value>(new Animated.Value(1)).current

    const opacity = useRef<Animated.Value>(new Animated.Value(1)).current

    //矢量动画, 将一维变成二维
    // const vector = useRef(new Animated.ValueXY({ x: 10, y: 10 })).current

    // 过 `rotate.interpolate` 方法对 `rotate` 进行插值。`rotate` 是一个 `Animated.Value` 对象，用于控制旋转动画的值
    const rotateValue = rotate.interpolate({
        inputRange: [0, 30],
        outputRange: ["0deg", "30deg"]
    })

    const [showRight, setShowRight] = useState(false)
    const [showView, setShowView] = useState(false)

    // 三个按钮的动画
    const showWidth0 = useRef(new Animated.Value(200)).current
    const showWidth1 = useRef(new Animated.Value(64)).current
    const showWidth2 = useRef(new Animated.Value(64)).current
    const [showIndex, setShowIndex] = useState(0)

    useEffect(() => {
        showAnimate0(showIndex == 0)
        showAnimate1(showIndex == 1)
        showAnimate2(showIndex == 2)
    }, [showIndex])

    const showAnimate0 = (isShow) => {
        Animated.timing(showWidth0, {
            toValue: isShow ? 200 : 64,
            duration: isShow ? 500 : 300,
            easing: isShow ? Easing.elastic(3) : Easing.ease,
            useNativeDriver: false
        }).start()
    }

    const showAnimate1 = (isShow) => {
        Animated.timing(showWidth1, {
            toValue: isShow ? 200 : 64,
            duration: isShow ? 500 : 300,
            easing: isShow ? Easing.elastic(3) : Easing.ease,
            useNativeDriver: false
        }).start()
    }

    const showAnimate2 = (isShow) => {
        Animated.timing(showWidth2, {
            toValue: isShow ? 200 : 64,
            duration: isShow ? 500 : 300,
            easing: isShow ? Easing.elastic(3) : Easing.ease,
            useNativeDriver: false
        }).start()
    }

    return <View style={styles.root}>
        <Button
            onPress={() => {
                // 用于创建基于时间的动画效果的一个函数
                Animated.timing(marginLeft, {
                    toValue: 200,
                    duration: 1000,
                    useNativeDriver: false  // 使用原生动画驱动
                }).start()  //开始动画
            }}
            color={"green"}
            title="平移(三种方式)"
        >
        </Button>

        <Button
            onPress={() => {
                Animated.timing(rotate, {
                    toValue: 30,
                    duration: 1000,
                    useNativeDriver: false
                }).start()  //开始动画
            }}
            color={"pink"}
            title="旋转"
        >
        </Button>

        <Button
            onPress={() => {
                Animated.timing(scale, {
                    toValue: 1.5,
                    duration: 1000,
                    useNativeDriver: false
                }).start()  //开始动画
            }}
            color={"red"}
            title="缩放"
        >
        </Button>

        <Button
            onPress={() => {
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 1000,
                    useNativeDriver: false
                }).start()  //开始动画
            }}
            color={"purple"}
            title="透明度"
        >
        </Button>

        <Button
            onPress={() => {
                //衰减动画, 弹性动画, 时间动画
                Animated.decay(marginLeft, {
                    velocity: 1,
                    deceleration: 0.995,    //衰减系数,越小,停的越快
                    useNativeDriver: false,
                }).start();
            }}
            color={"cyan"}
            title="三种动画函数"
        >
        </Button>

        <Button
            onPress={() => {

                Animated.timing(marginLeft, {
                    toValue: 200,
                    duration: 500,

                    //四种内置动画
                    // easing: Easing.back(5),
                    // easing: Easing.ease,
                    // easing: Easing.bounce,
                    // easing: Easing.elastic(3),

                    //三种标准函数
                    // easing: Easing.linear,
                    // easing: Easing.quad,
                    // easing: Easing.cubic,

                    //四种补充函数
                    // easing: Easing.bezier(0.7, 0.2, 0.42, 0.82),
                    // easing: Easing.circle,
                    // easing: Easing.sin,
                    // easing: Easing.exp,

                    //自由组合动画函数
                    easing: Easing.inOut(Easing.elastic(3)),

                    useNativeDriver: false,
                }).start();
            }}
            color={"orange"}
            title="时间动画函数"
        >
        </Button>


        <Button
            onPress={() => {

                // Animated.timing(vector, {
                //     toValue: { x: 300, y: 400 },
                //     duration: 500,
                //     useNativeDriver: false,
                // }).start();
            }}
            color={"green"}
            title="矢量动画"
        >
        </Button>

        <Button
            onPress={() => {
                const movexy = Animated.timing(marginLeft, {
                    toValue: 200,
                    duration: 1000,
                    useNativeDriver: false
                })
                const rotateValue = Animated.timing(rotate, {
                    toValue: 30,
                    duration: 1000,
                    useNativeDriver: false
                })
                const scaleValue = Animated.timing(scale, {
                    toValue: 1.5,
                    duration: 1000,
                    useNativeDriver: false
                })
                // 并发
                // Animated.parallel([movexy, rotateValue, scaleValue]).start();
                // 有序
                // Animated.sequence([movexy, rotateValue, scaleValue]).start();
                // 延迟
                Animated.sequence([
                    movexy,
                    Animated.delay(1000),
                    rotateValue,
                    Animated.delay(500),
                    scaleValue,
                ]).start();
            }}
            color={"pink"}
            title="组合动画"
        >
        </Button>



        {/* 将普通的View改为Animated.View */}
        <Animated.View style={[
            styles.view,
            { marginLeft: marginLeft }, //平移方式一
            { marginTop: marginLeft },

            {
                transform: [
                    { rotate: rotateValue },
                    { scale: scale },
                    // {translateX: marginLeft},    //平移方式二
                    // {translateY: marginLeft}
                ]
            },
            { opacity: opacity },

            // 平移方式二
            // {
            //     position: "absolute",
            //     top: marginLeft,
            //     left: marginLeft
            // }

            //矢量动画
            // { marginLeft: vector.x, marginTop: vector.y }
        ]}></Animated.View>

        {/* 使用LayoutAnimation用法 */}
        <View style={styles.layoutRoot}>

            <Button
                onPress={() => {
                    //在开始和结束做动画状态的转换
                    // LayoutAnimation.configureNext(
                    //     // LayoutAnimation.Presets.linear 
                    //     LayoutAnimation.Presets.spring,  //弹跳
                    //     () => {
                    //         ToastAndroid.show("动画结束", ToastAndroid.SHORT)
                    //     }
                    // )

                    //下面的是简单的写法,写在onPress下面
                    LayoutAnimation.spring()
                    setShowView(!showView)
                }}
                color={"red"}
                title="LayoutAnimation"
            >
            </Button>

            <TouchableOpacity style={styles.reverseBtn}
                onPress={() => {
                    //简单写法，就是组合动画的方式,写在onPress下面
                    LayoutAnimation.linear()
                    setShowRight(!showRight)
                }}
                color={"black"}
                activeOpacity={0.5} //不透明度变化
            >
                <Text> 文字左右反转 </Text>
            </TouchableOpacity>

            {showView &&
                <View style={[
                    styles.layoutAnimate,
                    { flexDirection: showRight ? "row" : "row-reverse" }
                ]}>

                    <Image style={styles.img} source={icon_avatar}></Image>
                    <Text style={styles.txt}>这是一行自我介绍的文本</Text>
                </View>
            }

        </View>


        <View style={styles.showRoot}>

            <TouchableOpacity
                onPress={() => {
                    setShowIndex(0)
                }}
                activeOpacity={0.5}
            >
                {/* 使用Animated.View包裹 */}
                <Animated.View style={[
                    styles.showView,
                    { width: showWidth0 },
                    { opacity: showIndex == 0 ? 1 : 0.75 }
                ]}>
                    <Image style={styles.showImg} source={icon_home}></Image>
                    <Text style={styles.showTxt}>首页推荐</Text>
                    <View style={styles.showDot}></View>
                </Animated.View>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => {
                    setShowIndex(1)
                }}
                activeOpacity={0.5}
            >
                {/* 谁需要动画，就给谁加上Animated.View */}
                <Animated.View style={[
                    styles.showView,
                    { width: showWidth1 },  // 设置宽度
                    { opacity: showIndex == 1 ? 1 : 0.75 }  // 设置透明度
                ]}>
                    <Image style={styles.showImg} source={icon_show}></Image>
                    <Text style={styles.showTxt}>热门直播</Text>
                    <View style={styles.showDot}></View>
                </Animated.View>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => {
                    setShowIndex(2)
                }}
                activeOpacity={0.5}
            >
                <Animated.View style={[
                    styles.showView,
                    { width: showWidth2 },
                    { opacity: showIndex == 2 ? 1 : 0.75 }
                ]}>
                    <Image style={styles.showImg} source={icon_gift}></Image>
                    <Text style={styles.showTxt}>我的礼物</Text>
                    <View style={styles.showDot}></View>
                </Animated.View>
            </TouchableOpacity>
        </View>


    </View>
}

const styles = StyleSheet.create({

    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F0F0F0"
    },
    view: {
        width: 100,
        height: 100,
        backgroundColor: "blue",
    },
    layoutAnimate: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
    },
    img: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    txt: {
        fontSize: 20,
        color: '#303030',
        fontWeight: 'bold',
        marginHorizontal: 20,
    },
    layoutRoot: {
        height: 100,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E0E0E0"
    },
    reverseBtn: {
        position: "absolute",
        left: 1,
        top: 1,
        width: 100,
        height: 30,
        backgroundColor: "skyblue",
        justifyContent: "center"
    },

    showRoot: {
        width: "100%",
        flex: 1,
        justifyContent: "space-around",
    },
    showView: {
        height: 40,
        flexDirection: "row",
        backgroundColor: "#2030ff",
        alignItems: "center",
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        overflow: "hidden"  //隐藏之外的东西，这里就是那个圆
    },
    showImg: {
        width: 20,
        height: 20,
        tintColor: 'white',
        marginLeft: 10
    },
    showTxt: {
        color: "#ffffffD0",
        fontSize: 14,
        marginLeft: 38
    },
    // 圆点
    showDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#20f020",
        marginLeft: 30
    }
})