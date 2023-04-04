import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

// 子节点只能写一个，并且只能写一个，并且必须写onPress方法
export default () => {
    return <View style={styles.root}>
        <TouchableHighlight style={styles.button}
            activeOpacity={0.1}
            onPress={() => {}}
            underlayColor={"green"}
        >
            <Text style={styles.txt}>按钮</Text>
        </TouchableHighlight>
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
        justifyContent: "center"
    },
    txt: {
        color: "white",
        fontSize: 24
    }
})