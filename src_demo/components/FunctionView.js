import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View, useWindowDimensions, useColorScheme } from "react-native";
import InfoCard from "./InfoCard";

// function FunctionView1() {
//     return (
//         <View View style={{ width: "100%", height: 200, backgroundColor: "blue" }}>

//         </View>
//     )
// }


// const FunctionView2 = () => {
//     return (
//         <View View style={{ width: "100%", height: 200, backgroundColor: "blue" }}>

//         </View>
//     )
// }

// 原始数据类型而言，调用 setAddress 更新原始数据类型状态的值，页面就会发生更新。
// 对于对象状态的更新，我先创建了一个新对象{}，然后用...的解构的方式将老对象 countObject 的内部值重新赋值给了新对象{}，对于数组状态的更新也是类似的
export default (props) => {

    const { name, age } = props;

    const [address, setAddress] = useState("浙江省杭州市")

    // 获取到控件的引用
    const scrollViewRef = useRef(null)

    //在屏幕尺寸变化时自动更新获取到的设备width和height值
    const { width, height } = useWindowDimensions()
    const colorSchme = useColorScheme()
    console.log(`width = ${width}, height = ${height}, colorSchme = ${colorSchme}`)

    //为空的时候，相当于加载完第一次渲染
    useEffect(() => {
        setTimeout(() => {
            setAddress("江苏省南京市")
            scrollViewRef.current.scrollToEnd({ animted: true })
        }, 2000)
    }, [])

    //每次改变都会加载，所以这里会打印两次，第一次是杭州市，初始赋值的时候，第二次是两秒后的南京
    useEffect(() => {
        console.log(`address = ${address}`)
    }, [address])

    //箭头函数，块体:定义的是一个函数，返回的是一个组件，这里的组件定义就是() => {}，
    //还有简单的写法,若只有一行代码,可以省略return
    //若没有入参,可以省略()=>{},只保留代码块
    //和kotlin的函数参数类似,只不过kolint的是{}包裹起来的
    const renderPrps = () => {
        <Text style={{ fontSize: 20, color: "white" }}>
            {
                `name= ${name}, age= ${age}, 地址= ${address}`
            }
        </Text>
    }

    // 如果箭头函数函数体只有一句话，那么这个句话可以不带大括号，而且这句话就是返回值（可以不用写return）,所有上面这句代码不写大括号也是可以的

    // 记住用params => {object:literal}这种简单的语法返回对象字面量是行不通的。
    // 这是因为花括号()里面的代码被解析为一系列语句(即 foo 被认为是一个标签，而非对象字面星的组成部分)。
    var func1 = () => { foo: 1 }

    // 所以，记得用圆括号把对象字面量包起来
    var func2 = () => ({foo: 11});

    const array = ["AAA", "BBB", "CCC", "DDD", "EEE", "FFF", "GGG"]

    //数组渲染
    const renderScroll = () => {
        return (
            <ScrollView ref={scrollViewRef}>
                {
                    // array.map(item => {
                    //     return (
                    //         <Text style={{ fontSize: 20, color: "white" }}>{item}</Text>
                    //     )
                    // })

                    // 数组对象的一个内置方法，用于对数组中的每个元素进行操作，并返回一个新的数组
                    // js函数调用，没有指定数据类型/没有对类型进行检测/没有对个数进行检查
                    // 如果未对函数参数进行赋值，需要对参数进行检查
                    array.map((item, index) => <Text key={index} style={{ fontSize: 20, color: "white" }}>{item}</Text>)
                }
            </ScrollView>
        )
    }

    return (
        <View View style={{ width: "100%", height: 200, backgroundColor: "blue" }}>
            {renderPrps()}
            {renderScroll()}
            <InfoCard name="InfoCard" levelView={<Text style={{ fontSize: 20, color: "red" }}>水平</Text>}>
                <Text style={{ fontSize: 20, color: "red" }}>爱好</Text>
            </InfoCard>
        </View>
    )
}

