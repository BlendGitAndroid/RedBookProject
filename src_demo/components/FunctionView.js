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

    //简单写法
    const renderPrps = () => (
        <Text style={{ fontSize: 20, color: "white" }}>
            {
                `name= ${name}, age= ${age}, 地址= ${address}`
            }
        </Text>
    )

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

                    array.map(item => <Text style={{ fontSize: 20, color: "white" }}>{item}</Text>)
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

