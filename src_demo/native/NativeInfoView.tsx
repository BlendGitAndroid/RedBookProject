import React, { useRef } from "react"
import { Button, StyleSheet, UIManager, View, ViewProps, findNodeHandle, requireNativeComponent } from "react-native"
import { avatarUri } from "../constants/Uri";

type NativeInfoViewType = ViewProps | {
    // 这部分是自定义的属性，原生ReactProp相对应
    avatar: string;
    name: string;
    desc: string;
    onShapeChange: (e: any) => void;
};

const NativeInfoView = requireNativeComponent<NativeInfoViewType>("NativeInfoView")

export default () => {

    const ref = useRef(null)

    const sendCommend = (command: string, params: any[]) => {
        const viewId = findNodeHandle(ref.current)  //获取View的Id
        const commands = UIManager.NativeInfoView.Commands[command].toString()
        UIManager.dispatchViewManagerCommand(viewId, commands, params)
    }

    return <>
        <Button
            onPress={() => {
                sendCommend("setShape", ["round"])
            }}
            color={"orange"}
            title="JS调用原生属性 和 调用原生View"
        />

        <NativeInfoView
            ref={ref}
            style={styles.infoView}
            avatar={avatarUri}
            name="Blend Android"
            desc="要加油哦"
            onShapeChange={(e: any) => {
                console.log(e.nativeEvent.shape)
            }}
        />
    </>
}

const styles = StyleSheet.create({
    infoView: {
        width: '100%',
        height: 200,
    },
})