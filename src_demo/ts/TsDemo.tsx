import React from "react";
import { Button, StyleSheet, View } from "react-native";

export default () => {

    const onButtonPress: () => void = () => {
        console.log("ts")
    }

    return <View style={styles.root}>
        <Button
            onPress={() => {
                onButtonPress()
            }}
            color={"green"}
            title="按钮"
        />
    </View>
}

const styles = StyleSheet.create({

    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F0F0F0"
    },
})