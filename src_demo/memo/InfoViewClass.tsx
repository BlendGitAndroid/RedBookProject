import React from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
} from 'react-native';

type Props = {
    info: UserInfo
}

//类组件避免重复渲染使用shouldComponentUpdate
export default class InfoViewClass extends React.Component<Props, any> {

    constructor(props: Props) {
        super(props)
    }


    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<any>, nextContext: any): boolean {
        return JSON.stringify(this.props.info) !== JSON.stringify(nextProps.info)
    }

    render(): React.ReactNode {
        const { info } = this.props

        // props每设置一次，都会发生渲染，不管props有没有改变
        console.log("render ...")
        return (
            <View style={darkStyles.content}>
                <Image style={darkStyles.img} source={{ uri: info.avatar }} />
                <Text style={darkStyles.txt}>{info.name}</Text>
                <View style={darkStyles.infoLayout}>
                    <Text style={darkStyles.infoTxt}>
                        {info.desc}
                    </Text>
                </View>
            </View>
        );
    }

}


const darkStyles = StyleSheet.create({
    content: {
        width: '100%',
        height: '100%',
        backgroundColor: '#353535',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 64,
    },
    img: {
        width: 96,
        height: 96,
        borderRadius: 48,
        borderWidth: 4,
        borderColor: '#ffffffE0',
    },
    txt: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 32,
    },
    infoLayout: {
        width: '90%',
        padding: 16,
        backgroundColor: '#808080',
        borderRadius: 12,
        marginTop: 24,
    },
    infoTxt: {
        fontSize: 16,
        color: 'white',
    },
});