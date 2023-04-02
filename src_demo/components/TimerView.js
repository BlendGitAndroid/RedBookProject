import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default () => {

    const [count, setCount] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            //这样写是有问题的,会导致count不会改变
            // setCount(count + 1)
            setCount((data) => {
                return data + 1;
            })
        }, 1000)

        //界面销毁的时候,就会调用注销方法
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <View style={styles.constainer}>
            <Text style={styles.titleText}>RN计数器</Text>
            <Text style={styles.countText}>{count}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    constainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#353535",
        flexDirection: "column",
        alignItems: "center",
    },
    titleText: {
        fontSize: 36,
        marginTop: 96,
        fontWeight: "bold",
        color: "white",
    },
    countText: {
        marginTop: 64,
        fontSize: 96,
        fontWeight: "bold",
        color: "#1876ff",
    },
})