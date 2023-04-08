import React, { useRef } from "react";
import { StyleSheet, Text, Button, View, TextInput } from "react-native";
import RefTextInput from "./RefTextInput";
import RefApiTextInput, { RefApi } from "./RefApiTextInput";
import RefApiClassTextInput from "./RefApiClassTextInput";

export default () => {

    const inputRef = useRef<TextInput>(null)

    const apiRef = useRef<RefApi>(null)

    const apiClassRef = useRef<RefApiClassTextInput>(null)

    return <View style={styles.root}>
        <Button
            onPress={() => {
                inputRef.current?.focus()
            }}
            color={"green"}
            title="forwardRef转发"
        />
        {/* 使用forwardRef进行ref转发, 外层组件操作内层组件, 指定内部的TextInput */}
        <RefTextInput ref={inputRef} />

        <View style={{ width: "100%", height: 20, marginTop: 20 }}></View>
        <Button
            onPress={() => {
                apiRef.current?.focus()
            }}
            color={"blue"}
            title="自定义组件对外暴露API"
        />
        {/* ref指向RefApiTextInput本身 */}
        <RefApiTextInput ref={apiRef} />

        <View style={{ width: "100%", height: 20, marginTop: 20 }}></View>
        <Button
            onPress={() => {
                apiClassRef.current?.focus()
            }}
            color={"orange"}
            title="自定义函数对外暴露API"
        />
        {/* ref指向RefApiClassTextInput本身 */}
        <RefApiClassTextInput ref={apiClassRef} />

    </View>
}

const styles = StyleSheet.create({

    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F0F0F0"
    },
})