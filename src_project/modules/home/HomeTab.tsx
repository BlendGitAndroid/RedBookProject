import React from "react";
import { StyleSheet, Text, Button, View } from "react-native";

export default () => {
    return <View style={styles.root}>
        <Button
            onPress={() => { }}
            color={"green"}
            title="首页"
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