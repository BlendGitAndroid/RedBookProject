import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";

// Pressable，定制按下和抬起的样式，从state参数中获取
export default () => {
    return <View style={styles.root}>
        <Pressable
            style={state => {
                return [styles.button, state.pressed && styles.buttonPressed]
            }}
        >
            {state => <Text style={state.pressed ? styles.txtPressed : styles.txt}>按 钮</Text>}
        </Pressable>
    </View>
}

const styles = StyleSheet.create({

    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F0F0F0"
    },
    button: {
        width: 300,
        height: 65,
        backgroundColor: '#2030FF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressed: {
        backgroundColor: 'white',
    },
    buttonPressed: {
        backgroundColor: 'white',
    },
    txtPressed: {
        fontSize: 20,
        color: '#2030FF',
        fontWeight: 'bold',
    },
    txt: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },

})