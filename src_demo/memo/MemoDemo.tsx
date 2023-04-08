import React, { useState } from 'react';
import { Button, View } from "react-native"
import InfoView from "./InfoView"

import { avatarUri } from '../constants/Uri';
import InfoViewClass from './InfoViewClass';
import ConsumeList from './ConsumeList';

export default () => {

    const [info, setInfo] = useState<UserInfo>({
        avatar: " ",
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
        {/* <InfoView info={info}></InfoView> */}

        {/* <InfoViewClass info={info}></InfoViewClass> */}

        <ConsumeList></ConsumeList>
    </View>)

}