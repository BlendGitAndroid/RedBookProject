import React from "react";
import { StyleSheet, Image, ImageBackground, View, Text } from "react-native";

import bg_card from "../assets/images/bg_card.png"
import icon_bank from "../assets/images/icon_bank.png"

export default () => {
    return <View style={styles.root}>
        <ImageBackground style={styles.viewStyle} imageStyle={styles.imgStyle}
            source={bg_card}
        >
            <Image style={styles.icon_logo} source={icon_bank} />
            <Text style={styles.textBank}>
                {`招商银行\n`}
                <Text style={styles.cardTypeText}>{`储蓄卡\n\n`}</Text>
                <Text style={styles.cardNoTxt}>●●●●   ●●●●   ●●●●   3068</Text>
            </Text>
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
        flexDirection: "row",
        alignItems: "flex-start"
    },
    imgStyle: {
        resizeMode: 'cover',
        borderRadius: 15,
    },
    icon_logo: {
        width: 48,
        height: 48,
        marginLeft: 20,
        marginTop: 20,
    },
    textBank: {
        fontSize: 24,
        color: "white",
        marginLeft: 10,
        marginTop: 21,
        marginBottom: 10,
        fontWeight: "bold",
    },
    cardTypeText: {
        fontSize: 20,
        color: "#FFFFFFA0",
        fontWeight: "normal",
    },
    cardNoTxt: {
        fontSize: 16,
        fontWeight: "bold",
    }

})


