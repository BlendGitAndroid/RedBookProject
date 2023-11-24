import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default () => {

    const [count, setCount] = useState(0)

    /**
     * 闭包是一个函数，他能从外部作用域捕获变量的函数。
     * 闭包（例如事件处理程序，回调）可能会从函数组件作用域中捕获状态变量。 由于状态变量在渲染之间变化，因此闭包应捕获具有最新状态值的变量。
     * 否则，如果闭包捕获了过时的状态值，则可能会遇到过时的状态问题。
     * 
     * setInterval() 是一个过时的闭包，它从初始渲染（使用0初始化时）中捕获了过时的count变量。
     * 为了解决这个问题，使用函数方法来更新count状态,React 确保将最新状态值作为参数提供给更新状态函数，过时闭包的问题解决了。
     */
    useEffect(() => {
        const interval = setInterval(() => {
            //这样写是有问题的,会导致count不会改变，因为setInterval第一个函数是闭包，闭包读取外部的count值，就会有闭包过时的问题，初始值都是0，并没有加1
            // setCount(count + 1)
            //改成下面这样，data获取的始终是count最新的值，就不会过期
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
        alignItems: "center",   // 将容器的子元素居中对齐于容器次轴上
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