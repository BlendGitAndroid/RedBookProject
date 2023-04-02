import React, { useEffect, useRef } from "react";
import { StyleSheet, Image, View } from "react-native";

import avatar from "../assets/images/avatar.png"
import { imageUri } from "../constants/Uri";
import icon_seetting from "../assets/images/icon_setting.png"

// fadeDuration: 键入动画时间
// defaultSource：占位图
// 
export default () => {

    useEffect(() => {
        //获取imageUri的宽高
        Image.getSize(imageUri, (width, height) => {
            console.log(`width = ${width}, height = ${height}`)
        }, (error) => {
            console.log(error)
        })

        // 预加载
        Image.prefetch(imageUri).then(data => {
            console.log(data);
        }).catch(e => {
            console.log(e);
        })
    }, [])

    return <View style={styles.root}>
        <Image style={styles.img} source={avatar} />
        <Image style={styles.imgContain} fadeDuration={3000} defaultSource={avatar} source={{ uri: imageUri }} />
        <Image style={styles.img} blurRadius={3} source={avatar}
            onLoad={(event) => {
                //{"source": {"height": 300, "uri": "http://localhost:8081/assets/src_demo/assets/images/avatar.png?platform=android&hash=35437f8b93bd115c7c54fce200946844", "width": 300}}
                console.log(event.nativeEvent)
            }}
            onError={() => {

            }}

            onLoadStart={() => {

            }}

            onLoadEnd={() => {

            }}
        />
        <Image style={styles.imgTintColor} source={icon_seetting} />
    </View>
}

//fontFamily 写在assets/fonts的目录下面
const styles = StyleSheet.create({

    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F0F0F0"
    },
    img: {
        width: 160,
        height: 160
    },
    imgContain: {
        width: 160,
        height: 100,
        resizeMode: "contain"
    },
    imgTintColor: {
        width: 240,
        height: 240,
        tintColor: "red"
    },
})