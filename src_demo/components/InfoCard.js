import React from "react";
import { Text, View, StyleSheet } from "react-native"

//拆分渲染的三种方式
export default (props) => {

    const { name, levelView } = props

    //样式组合
    return (
        <View style={{ width: "100%", flexDirection: "column" }}>
            <Text style={ [styles.text, styles.textBold]}>
                {`姓名：${name}`}
            </Text>
            {/* 显示语句块，因为这是一个对象 */}
            {levelView} 
            {/* 显示子组件 */}
            {props.children}
        </View>
    )

}


const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: "black",
        marginHorizontal: 5
    },
    textBold: {
        fontWeight: "bold",
    }
});