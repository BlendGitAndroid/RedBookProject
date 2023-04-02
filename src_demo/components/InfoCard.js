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
            {levelView}
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