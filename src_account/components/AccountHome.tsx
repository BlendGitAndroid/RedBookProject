import React from "react"
import { View, StyleSheet, Text } from "react-native"

export default () => {

    return <View style={styles.root}>
        <Text>帐号管理</Text>
    </View>

}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F0F0F0",
        justifyContent: "center",
        alignItems: "center"
    },

})