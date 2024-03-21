import React, { useEffect, useRef } from "react";
import { StyleSheet, Image, ImageBackground, View, Text, TextInput } from "react-native";

//样式和Text一样
export default () => {

    // 获取焦点
    const inputRef = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            //blur获取焦点
            inputRef.current.focus()
        }, 2000)
    }, [])

    return <View style={styles.root}>
        <TextInput
            ref={inputRef}
            style={styles.input}
            autoFocus={false}
            // 如果为 true，文本框会在提交的时候失焦。
            blurOnSubmit={true}
            // caretHidden={true}  //隐藏光标
            defaultValue="请输入"
            editable={true}   //是否可编辑
            keyboardType="number-pad"  //有数字等
            returnKeyType="go"
            maxLength={11}
            onFocus={() => {

            }}
            onBlur={() => {

            }}
            onChange={(event) => {
                console.log(event.nativeEvent)
            }}
            onChangeText={(text) => {
                console.log(text)
            }}
            textAlign="center"
            secureTextEntry={false}  //密文显示
        />
    </View>
}

const styles = StyleSheet.create({

    root: {
        width: "100%",
        height: "100%",
        flexDirection: "column",
        backgroundColor: "#F0F0F0"
    },
    input: {
        width: "100%",
        height: 56,
        backgroundColor: "#d0d0d0",
        color: "red",
        fontSize: 24,
        borderRadius: 10,
    }

})