import React, { useEffect } from "react";
import { StyleSheet, Text, Button, View, Alert, Platform, Linking, PixelRatio, Dimensions, BackHandler, PermissionsAndroid, Vibration, ToastAndroid, Keyboard, TextInput } from "react-native";

import { useBackHandler } from "@react-native-community/hooks";

export default () => {


    useEffect(() => {

        BackHandler.addEventListener("hardwareBackPress", backForAndroid)

        const showSubscription = Keyboard.addListener("keyboardDidShow", onKoardDidShow)
        const hideSubscription = Keyboard.addListener("keyboardDidHide", onKoardDidHidden)

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backForAndroid)
            showSubscription.remove()
            hideSubscription.remove()
        }

    }, [])


    const backForAndroid = () => {
        return true;
    }

    const onKoardDidShow = () => {
        console.log('键盘出现');
    }

    const onKoardDidHidden = () => {
        console.log('键盘消失');
    }

    //第三方hook库, 和BackHandler.addEventListener是一样的
    useBackHandler(() => {
        return true
    })


    return <View style={styles.root}>
        <Button
            onPress={() => {
                // alert("这是一条提示信息")
                const buttons = [
                    { text: "取消", onPress: () => { } },
                    { text: "确定", onPress: () => { } }
                ]
                Alert.alert("这是标题", "这是内容", buttons)
            }}
            color={"green"}
            title="alert"
        >
        </Button>

        <Button
            onPress={() => {
                console.info("信息日志")
                // console.debug("信息日志")
                // console.warn("信息日志")
                // console.error("信息日志")

                console.log("我的名字叫%s, 开发%d年了", "Blend", 4) //字符串占位符
            }}
            color={"blue"}
            title="console"
        >
        </Button>

        <Button
            onPress={() => {
                console.log(Platform.OS)
                console.log(Platform.Version)   //Android手机版本号
                console.log(Platform.constants) //手机设备参数
                console.log(Platform.isPad)
            }}
            color={"red"}
            title="Platform"
        >
        </Button>

        <Button
            onPress={() => {

            }}
            color={"orange"}
            title="StyleSheet"
        >
        </Button>

        <Button
            onPress={() => {
                if (Linking.canOpenURL("https://www.baidu.com")) {
                    // Linking.openURL("https://www.baidu.com")
                    // Linking.openURL("tel:10086")
                    // Linking.openURL("smsto:10086")
                    // Linking.openURL("mailto:10086@qq.com")
                    // Linking.openURL(scheme) scheme跳转
                    Linking.openSettings()
                    // Linking.sendIntent()
                }
            }}
            color={"purple"}
            title="Linking"
        >
        </Button>

        <Button
            onPress={() => {
                console.log(PixelRatio.get())   //RN中的像素和物理像素的比例
                console.log(Dimensions.get("screen").scale)  //和上面的一样
                console.log(PixelRatio.getFontScale())  //字体比例缩放
                console.log(PixelRatio.getPixelSizeForLayoutSize(200))  //200大小的真实像素大小
                console.log(PixelRatio.roundToNearestPixel(32.1))   //用于特殊情况下的,尤其是小数的
            }}
            color={"cyan"}
            title="PixelRatio"
        >
        </Button>

        <Button
            onPress={() => {
                BackHandler.exitApp() //直接回到主界面
            }}
            color={"pink"}
            title="BackHandler"
        >
        </Button>

        <Button
            onPress={() => {
                PermissionsAndroid.check("android.permission.WRITE_EXTERNAL_STORAGE")
                    .then(result => {
                        if (!result) {
                            PermissionsAndroid.request("android.permission.WRITE_EXTERNAL_STORAGE")
                                .then(status => {
                                    console.log(status)
                                    if (status == "granted") {

                                    } else {

                                    }
                                })
                        } else {
                            console.log(`result OK`)
                        }
                    })
            }}
            color={"green"}
            title="Permissions"
        >
        </Button>

        <Button
            onPress={() => {
                Vibration.vibrate(1000, true);
            }}
            color={"red"}
            title="Vibration"
        >
        </Button>

        <Button
            onPress={() => {
                // ToastAndroid.show("Toast", ToastAndroid.SHORT)
                ToastAndroid.showWithGravity("Toast", ToastAndroid.SHORT, ToastAndroid.CENTER)
            }}
            color={"cyan"}
            title="Toast"
        >
        </Button>

        <Button
            onPress={() => {

            }}
            color={"orange"}
            title="transForm"
        >
        </Button>

        <Button
            onPress={() => {
                Keyboard.dismiss()
            }}
            color={"pink"}
            title="keyboard"
        >
        </Button>

        <TextInput style={{
            width: "100%", height: 56, backgroundColor: "#E0E0E0"
        }}></TextInput>

        <View style={[
            { width: 100, height: 100, backgroundColor: "#3050ff", marginTop: 20 },
            {
                transform: [
                    { translateX: 20 },
                    { translateY: 20 },
                    { scale: 1.1 },
                    { rotate: "30deg" } //rotateZ
                ]
            }
        ]}>

        </View>
    </View>
}

const styles = StyleSheet.create({

    root: {
        width: "100%",
        height: "100%",
        backgroundColor: Platform.select({
            android: "white",
            ios: "black",
            default: "red"
        }),
        ...Platform.select({    //展开运算符,设置属性
            android: { backgroundColor: "white" },
            ios: { backgroundColor: "black" },
            default: { backgroundColor: "red" }
        })
    },
})