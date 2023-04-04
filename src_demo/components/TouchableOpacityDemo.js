import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default () => {
    return <View style={styles.root}>
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5} //不透明度变化
            onPress={() => {

            }}
            onLongPress={() => {

            }}
            delayLongPress={2000} //指定长按多久算长按
            onPressIn={() => {

            }}
            onPressOut={() => { //先onPressIn，再onPressOut，再onPress

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
        justifyContent:"center"
    },
    txt: {
        color: "white",
        fontSize: 24
    }
})