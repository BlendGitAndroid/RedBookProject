import React, { useRef } from "react";
import { StyleSheet, ScrollView, View, Text, TextInput, Button, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export default () => {

    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

    const returnArrayView = (arrayView) => {
        return arrayView.map((item, index) => {
            return <Text key={`${index}`} style={styles.txt}>{item}</Text>
        })
    }

    const scrollViewRef = useRef(null)

    return <ScrollView
        ref={scrollViewRef}
        style={styles.root}
        contentContainerStyle={styles.containerStyle}
        keyboardDismissMode="on-drag"   //滚动键盘消失
        keyboardShouldPersistTaps="handled" //点击键盘消失
        onScroll={(event) => {  //监听滚动距离
            console.log(event.nativeEvent.contentOffset.y)
        }}
        horizontal={true}
        pagingEnabled={true}
        scrollEnabled={true} //可以滚动
        // contentOffset={{ y: 100 }}
        stickyHeaderIndices={[1]}
    >
        <View style={styles.pageView}>
            <TextInput style={styles.textInput}></TextInput>
            <Button title="按钮" onPress={() => {
                console.log("Button..")
                scrollViewRef.current.scrollToEnd({ animated: true });
            }}></Button>
            {returnArrayView(array)}
            {/* {
            array.map((item, index) => {
                return <Text key={`${index}`} style={styles.txt}>{item}</Text>
            })
        } */}
        </View>
        <View style={styles.pageView2}></View>
        <View style={styles.pageView3}></View>
    </ScrollView>
}

const styles = StyleSheet.create({

    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F0F0F0"
    },
    txt: {
        width: "100%",
        height: 56,
        textAlignVertical: "center",
        color: "black"
    },
    containerStyle: {
        paddingHorizontal: 16,
        backgroundColor: "#E0E0E0"
    },
    textInput: {
        width: "100%",
        height: 48,
        backgroundColor: "red",
    },
    pageView: {
        width: width,   //这里的宽为整个屏幕的宽度
        height: "100%",
    },
    pageView2: {
        width: width,
        height: "100%",
        backgroundColor: "green",
    },
    pageView3: {
        width: width,
        height: "100%",
        backgroundColor: "blue",
    }
})