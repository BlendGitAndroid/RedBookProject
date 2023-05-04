import React from "react";
import { Button, StyleSheet, View } from "react-native";

// ts就是在编译期间
export default () => {

    const add = (n1: number, n2: number): number => {
        return n1 + n2
    }

    //onButtonPress是一个函数，他是一个无参，并且没有返回值的函数
    const onButtonPress: () => void = () => {

        const num1: number = 12
        const num2: number = 12.34
        console.log(add(num1, num2))

        const num3: Number = new Number(13)
        console.log(num3.valueOf())

        const b: boolean = !!undefined
        console.log(b)

    }

    const onButtonPress2: () => void = () => {

        const a1: number[] = [1, 2, 3, 4, 5, 6]
        const a2: Array<number> = [1, 2, 3, 4, 5]
        const a3: Array<number> = new Array(5)

        const a4: Array<number | string> = new Array()
        a4.push(3)  //向后追加

        //元祖，本质上就是数组，不过是长度和类型固定的长度
        const t1: [string, number, boolean] = ["Blend", 12, true]
        console.log(t1)

        enum Job {
            Teacher,
            Programmer,
            Cook
        }
        console.log(Job.Programmer) //是1

        enum City {
            NanJing = "南京",
            WuXi = "无锡",
            HangZhou = "杭州"
        }
        console.log(City.HangZhou)
    }

    //可选
    // const onButtonPress3: (age: Number, s?: string) => void = (age: Number = 5, s?: string) => {
    //     console.log(age + (s || "没有值"))
    // }

    //这样写的话，就不用写函数定义了，会冲突。下面这样下，会推断出来
    const onButtonPress3 = (age: Number = 5, s?: string) => {
        console.log(age + (s || "没有值"))
    }

    const onButtonPress4: () => void = () => {
        const student: Student = {
            name: "Blend",
            age: 30,
            hobby: undefined
        } as Student

        console.log(student)
    }

    const onButtonPress5: () => void = () => {
        const dog: Info.Dog = {
            name: "大黄",
            age: 12,
            weight: 20
        } as Info.Dog

        console.log(dog)
    }

    return <View style={styles.root}>
        <Button
            onPress={() => {
                onButtonPress()
            }}
            color={"green"}
            title="基本数据类型"
        />

        <Button
            onPress={() => {
                onButtonPress2()
            }}
            color={"blue"}
            title="数组，元祖，枚举"
        />

        <Button
            onPress={() => {
                onButtonPress3()
            }}
            color={"pink"}
            title="函数类型"
        />

        <Button
            onPress={() => {
                onButtonPress4()
            }}
            color={"orange"}
            title="类型文件"
        />

        <Button
            onPress={() => {
                onButtonPress5()
            }}
            color={"purple"}
            title="命名空间"
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