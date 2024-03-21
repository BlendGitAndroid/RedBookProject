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
     * 
     * 在JavaScript中，闭包是一个函数，它可以访问其自身作用域、外部函数作用域和全局作用域中的变量。在React的函数组件中，当我们在某个作用域
     * （如`useEffect`或事件处理函数）中引用状态变量时，我们实际上创建了一个闭包。
     * 闭包的"过时"问题是指，闭包在创建时捕获了当时的环境状态，包括当时的状态变量值。然而，状态变量的值可能会在闭包创建后发生变化，但闭包仍然
     * 保持对当时的状态变量值的引用。这就导致了闭包中的状态变量值可能是"过时"的。在你的代码中，`setInterval`函数创建了一个闭包，这个闭包在每次
     * 渲染时捕获了`count`的当前值。然而，由于`setInterval`的回调函数是在组件首次渲染时定义的，所以它捕获的`count`值始终是0，即使后续`count`的值
     * 发生了变化。为了解决这个问题，你可以使用函数形式的`setState`。这种形式的`setState`接受一个函数作为参数，这个函数接受当前的状态值作为参数，
     * 并返回新的状态值。这样，你就可以确保总是使用最新的状态值，而不是闭包捕获的可能已经过时的值。
        ```javascript
            setCount((data) => {
                return data + 1;
            })
        ```
        在这段代码中，`data`参数就是当前的`count`值。这个函数返回`data + 1`，所以新的`count`值就是当前值加1。这样，即使`setInterval`的回调函数是一
        个闭包，也能确保总是使用最新的`count`值。
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