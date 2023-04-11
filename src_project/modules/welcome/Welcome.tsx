import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

import icon_logo from "../../assets/icon_main_logo.png"
import { load } from '../../utils/Storage';

export default () => {

    const navigation = useNavigation<StackNavigationProp<any>>();

    useEffect(() => {
        setTimeout(() => {
            getUserInfo()
        }, 1500)
    }, [])

    const getUserInfo = async () => {
        const catchUserInfo = await load("userInfo")
        if (catchUserInfo && JSON.parse(catchUserInfo)) {   //不为null且可以进行JSON解析
            startHome()
        } else {
            startLogin()
        }
    }

    const startLogin = () => {
        navigation.replace("Login")
    }

    const startHome = () => {
        navigation.replace("MainTab")
    }

    return <View style={styles.root}>
        <Image style={styles.logo_main} source={icon_logo}></Image>
    </View>

}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        flexDirection: "column",
        alignItems: "center"
    },
    logo_main: {
        width: 210,
        height: 110,
        marginTop: 200,
        resizeMode: "contain"   //保证全部展示
    },
})
