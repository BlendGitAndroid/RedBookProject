import React, { useState } from "react";
import { StyleSheet, SectionList, Text, Button, Modal, View } from "react-native";

import { SectionData } from '../constants/Data';

//Dialog按钮
export default () => {

    const [visible, setVisible] = useState(false)

    const renderItem = ({ item, index, section }) => {
        return <Text style={styles.txt}>{item}</Text>
    }

    const renderSectionHeader = ({ section }) => {
        return (
            <Text style={styles.sectionHeaderTxt}>{section.type}</Text>
        );
    }

    return <View style={styles.root}>

        <Button title="按钮" onPress={() => {
            setVisible(true)
        }}></Button>

{/* animationType指定了 modal 的动画类型。

slide 从底部滑入滑出。
fade 淡入淡出。
none 没有动画，直接蹦出来。 */}
        <Modal
            visible={visible}
            onRequestClose={() => { setVisible(false) }} //点击返回按钮触发
            transparent={true}  //透明背景
            statusBarTranslucent={true} //沉浸式状态栏
            animationType="slide"   //动画方式
            onShow={() => {

            }}
            onDismiss={() => {  //onDismiss没有回调

            }}
        >
            <View style={styles.blank}></View>
            <View style={styles.content}>
                <SectionList
                    style={styles.container}
                    sections={SectionData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    renderSectionHeader={renderSectionHeader}
                    stickySectionHeadersEnabled={true}  //吸顶的效果
                >

                </SectionList>
            </View>
        </Modal>
    </View>
}

const styles = StyleSheet.create({

    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F0F0F0"
    },
    blank: {
        width: '100%',
        height: '10%',  //这里的高度是相对于父容器的高度
        backgroundColor: '#00000050',
    },
    content: {
        width: "100%",
        height: "90%",
    },
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "white"
    },
    txt: {
        width: "100%",
        height: 56,
        color: "#333333",
    },
    sectionHeaderTxt: {
        width: '100%',
        height: 36,
        backgroundColor: '#DDDDDD',
        textAlignVertical: 'center',
        paddingLeft: 16,
        fontSize: 20,
        color: '#333333',
        fontWeight: 'bold',
    },
})