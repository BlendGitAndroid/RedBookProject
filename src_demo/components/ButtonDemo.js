import React from "react";
import { StyleSheet, Text, Button, View } from "react-native";

// 无法定制样式
export default () => {
    return <View style={styles.root}>
        <Button
            onPress={() => { }}
            color={"green"}
            title="按钮"
            disabled={false} //能否点击，变灰色
        >
        </Button>
    </View>
}

const styles = StyleSheet.create({

    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F0F0F0"
    },
})