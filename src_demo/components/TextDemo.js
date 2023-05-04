import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default () => {
    return <View style={styles.root}>
        <Text style={styles.text}
            numberOfLines={3}
            ellipsizeMode="tail"
            //可选择及选择颜色
            selectable={true}
            selectionColor={"red"}
            onPress={() => {

            }}
            onLongPress={() => {

            }}
            //跟随系统字体
            allowFontScaling={true}
        >我在好好学习，Blend加油，你要好好学习
            <Text style={styles.innerText}>写文字</Text>
            写文字写文字写文字写文字写文字</Text>
    </View>
}

//fontFamily 写在assets/fonts的目录下面
const styles = StyleSheet.create({

    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F0F0F0"
    },
    text: {
        width: "100%",
        height:500,
        fontSize: 24,
        fontWeight: "bold",
        backgroundColor:"white",
        textAlign:"center",
        textAlignVertical: "center",
        includeFontPadding: false   //不写下面两个，Android系统上文字会偏下
    },
    innerText: {
        color: "blue",
        fontSize: 30,
        textDecorationLine:"underline"
    }

})


