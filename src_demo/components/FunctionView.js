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

    /**
     * 上面这两句代码的主要区别在于返回值。

        `var func1 = () => { foo: 1 }` 这句代码中，箭头函数的函数体被大括号 `{}` 包围，所以 JavaScript 将其解析为一个语句块，而不是一个对象字面量。
        在这个语句块中，`foo: 1` 被视为一个标签和一个数字，而不是一个键值对。因此，这个函数没有返回值，调用 `func1()` 会返回 `undefined`。

        `var func2 = () => ({foo: 11})` 这句代码中，箭头函数的函数体被圆括号 `()` 包围，这使得 JavaScript 将其解析为一个表达式，而不是一个语句块。
        在这个表达式中，`{foo: 11}` 是一个对象字面量，有一个属性 `foo`，其值为 `11`。因此，这个函数的返回值是这个对象，调用 `func2()` 会返回 `{foo: 11}`。

        在JavaScript中，表达式和语句块有一些基本的区别：

        1. 表达式：表达式是一段代码，它计算并产生一个值。例如，`1 + 2`、`"Hello" + " World"`、`functionCall()`、`{foo: 11}` 等都是表达式。表达式可以被
        用在任何需要值的地方，例如赋值语句的右边、函数调用的参数等。
        2. 语句块：语句块是由一对大括号 `{}` 包围的一段代码，它包含了一系列的语句。例如，`if` 语句、`for` 循环、函数定义等都包含了语句块。语句块通常用于控
        制流程，例如条件判断、循环等。

        在箭头函数中，如果函数体被大括号 `{}` 包围，那么它就是一个语句块，需要使用 `return` 语句来返回值。如果函数体不被大括号 `{}` 包围，那么它就是一个表
        达式，这个表达式的值就是函数的返回值。

        例如，`var func1 = () => { foo: 1 }` 这句代码中，箭头函数的函数体是一个语句块 `{ foo: 1 }`，而不是一个表达式。在这个语句块中，`foo: 1` 被解析为
        一个标签和一个数字，而不是一个键值对。因此，这个函数没有返回值，调用 `func1()` 会返回 `undefined`。

        而 `var func2 = () => ({foo: 11})` 这句代码中，箭头函数的函数体是一个表达式 `({foo: 11})`，而不是一个语句块。在这个表达式中，`{foo: 11}` 是一个
        对象字面量，有一个属性 `foo`，其值为 `11`。因此，这个函数的返回值是这个对象，调用 `func2()` 会返回 `{foo: 11}`。
     */

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
                    // 在JavaScript中，函数调用时并不需要传递所有的参数。如果你没有提供某个参数，那么在函数内部，这个参数的值会是 undefined。
                    array.map((item, index) => <Text key={index} style={{ fontSize: 20, color: "white" }}>{item}</Text>)
                }
            </ScrollView>
        )
    }

    return (
        // 在 React 和 JSX 中，`style={{}}` 中的两个大括号 `{}` 有不同的含义。
        // 外层的 `{}` 是 JSX 语法，表示我们要插入一个 JavaScript 表达式。在 JSX 中，任何你想要引用 JavaScript 变量或表达式的地方，都需要用 `{}` 包裹起来。
        // 内层的 `{}` 则创建了一个 JavaScript 对象，这是因为在 React 中，行内样式需要以对象的形式来书写。例如，`style={{ color: 'red', fontSize: 16 }}`，
        // 这里的 `{ color: 'red', fontSize: 16 }` 就是一个 JavaScript 对象，表示 CSS 样式。
        // 所以，`style={{}}` 的含义是：在 JSX 中插入一个 JavaScript 表达式，这个表达式是一个对象，用于定义 CSS 样式。
        <View View style={{ width: "100%", height: 200, backgroundColor: "blue" }}>
            {renderPrps()}
            {renderScroll()}

            {/* {<Text style={{ fontSize: 20, color: "red" }}>水平</Text>}  这个表示的就是语句块*/}
            <InfoCard name="InfoCard" levelView={<Text style={{ fontSize: 20, color: "red" }}>水平</Text>}>
                <Text style={{ fontSize: 20, color: "red" }}>爱好</Text>
            </InfoCard>
        </View>
    )
}


// 在 JSX 中，你需要在以下情况中使用 `{}`：
// 1. 插入 JavaScript 表达式：在 JSX 中，如果你想插入一个 JavaScript 表达式，你需要将它放在 `{}` 中。例如，`<div>{myVariable}</div>` 
// 或 `<div>{1 + 2}</div>`。
// 2. 插入 JavaScript 对象：在 JSX 中，如果你想插入一个 JavaScript 对象，你需要将它放在 `{}` 中。例如，`<div style={{ color: 'red' }}></div>`。
// 3. 插入 JSX 元素：在 JSX 中，如果你想插入一个 JSX 元素，你需要将它放在 `{}` 中。例如，`<div>{<MyComponent />}</div>`。

// 你不需要在以下情况中使用 `{}`：
// 1. 插入字符串：在 JSX 中，如果你想插入一个字符串，你可以直接写，不需要 `{}`。例如，`<div>Hello World</div>`。
// 2. 设置字符串属性：在 JSX 中，如果你想设置一个属性的值为一个字符串，你可以直接写，不需要 `{}`。例如，`<div className="myClass"></div>`。
// 总的来说，当你需要在 JSX 中插入 JavaScript 表达式（包括变量、对象、数组、函数、JSX 元素等）时，你需要使用 `{}`。当你只是插入字符串或设置字
// 符串属性时，你不需要使用 `{}`。