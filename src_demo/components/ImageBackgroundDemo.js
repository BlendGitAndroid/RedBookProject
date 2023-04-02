import React from "react";
import { StyleSheet, Image, ImageBackground, View, Text } from "react-native";

import bg_card from "../assets/images/bg_card.png"
import icon_bank from "../assets/images/icon_bank.png"

export default () => {
    return <View style={styles.root}>
        <ImageBackground style={styles.viewStyle} imgStyle={styles.imgStyle}
            source={bg_card}
        >
            <Text>子元素</Text>
        </ImageBackground>
    </View>
}

const styles = StyleSheet.create({

    root: {
        width: "100%",
        height: "100%",
        flexDirection: "column",
        backgroundColor: "#F0F0F0"
    },
    viewStyle: {
        width: "100%",
        height: 150,
        flexDirection: "row",
        alignItems: "flex-start"
    },
    imgStyle: {
        resizeMode: 'cover',
        borderRadius: 12,
    }

})


