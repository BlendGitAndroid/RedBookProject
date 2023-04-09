import React from "react";
import { StyleSheet, Text, Button, View, NativeModules, ToastAndroid, Image } from "react-native";
import NativeInfoView from "./NativeInfoView";
import NativeInfoViewGroup from "./NativeInfoViewGroup";

import { avatarUri } from '../constants/Uri';

export default () => {

    const { jsToApp } = NativeModules

    return <View style={styles.root}>
        <Button
            onPress={() => {
                jsToApp?.openGallery();
            }}
            color={"green"}
            title="JS调用原生方法-不带返回值（调用原生相册）"
        />

        <Button
            onPress={() => {
                jsToApp?.getVersionName().then((data: string) => {
                    ToastAndroid.show(data, ToastAndroid.SHORT)
                });
            }}
            color={"blue"}
            title="JS调用原生方法-带返回值（调用原生版本号）"
        />

        <NativeInfoView />

        <Button
            onPress={() => {

            }}
            color={"pink"}
            title="JS调用原生ViewGroup"
        />

        <NativeInfoViewGroup>
            <View style={styles.content}>
                <Image
                    style={styles.avatarImg}
                    source={{ uri: avatarUri }}
                />
                <View style={styles.nameLayout}>
                    <Text style={styles.nameTxt}>尼古拉斯·段坤</Text>
                    <Text style={styles.descTxt}>
                        各位产品经理大家好，我是个人开发者张三，我学习RN两年半了，我喜欢安卓、RN、Flutter，Thank you!。
                    </Text>
                </View>
            </View>
        </NativeInfoViewGroup>
    </View>
}

const styles = StyleSheet.create({

    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F0F0F0"
    },
    content: {
        width: '100%',
        height: 200,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
        backgroundColor: 'white',
    },
    avatarImg: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 50,
    },
    nameLayout: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 16,
    },
    nameTxt: {
        fontSize: 20,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 4,
    },
    descTxt: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
})