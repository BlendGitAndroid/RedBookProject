import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default () => {
    return <View style={styles.root}>
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5} //不透明度变化
            onPress={() => {
                console.log("onPress")
            }}
            onLongPress={() => {

            }}
            delayLongPress={2000} //指定长按多久算长按
            onPressIn={() => {
                console.log("onPressIn")
            }}
            onPressOut={() => { //先onPressIn，再onPressOut，再onPress，onPressOut和onPress几乎同时出现，这样就能自己实现Pressable组件的功能
                console.log("onPressOut")
            }}
        >

            <Text style={styles.txt}>按钮</Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({

    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F0F0F0"
    },
    button: {
        width: 300,
        height: 65,
        backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center" //将容器中的子元素在主轴上居中对齐
    },
    txt: {
        color: "white",
        fontSize: 24
    }
})