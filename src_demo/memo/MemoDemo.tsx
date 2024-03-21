import React, { useState } from 'react';
import { Button, View } from "react-native"
import InfoView from "./InfoView"

import { avatarUri, imageUri } from '../constants/Uri';
import InfoViewClass from './InfoViewClass';
import ConsumeList from './ConsumeList';

// 函数式组件/类组件/方法/UI 避免重建
export default () => {

    const [info, setInfo] = useState<UserInfo>({
        avatar: imageUri,
        name: " ",
        desc: " "
    })

    return (<View style={{ width: "100%" }}>
        <Button title='赋值'
            onPress={() => {
                setInfo({
                    avatar: avatarUri,
                    name: "BlendAndroid",
                    desc: "如饥似渴，大智若愚"
                })
            }}
        />

        {/* 函数式组件避免重复渲染使用memo */}
        {/* <InfoView info={info}></InfoView> */}

        {/* 类组件避免重复渲染使用shouldComponentUpdate */}
        {/* <InfoViewClass info={info}></InfoViewClass> */}

        <ConsumeList></ConsumeList>
    </View>)

}