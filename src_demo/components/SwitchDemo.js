import React, { useState } from "react";
import { StyleSheet, View, Switch } from "react-native";


export default () => {

    const [switchValue, setSwitchValue] = useState(true)

    return <View style={styles.root}>
        <Switch
            value={switchValue}
            onValueChange={(value) => {
                setSwitchValue(value)
            }}
            disabled={false}
            trackColor={{ true: "red", false: "#808080" }}    //背景颜色
            thumbColor={switchValue ? "green" : "blue"}    //开关圆圈的颜色
        >
        </Switch>
    </View>
}

const styles = StyleSheet.create({

    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F0F0F0"
    },
})