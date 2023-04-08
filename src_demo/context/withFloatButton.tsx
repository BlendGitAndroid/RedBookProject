import React, { useEffect } from 'react';

import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import icon_add from "../assets/images/icon_add.png"


//联合类型
type IReactComponent =
    React.ClassicComponentClass
    | React.ComponentClass
    | React.FunctionComponent
    | React.ForwardRefExoticComponent<any>;

export default <T extends IReactComponent>(OriginView: T): T => {

    const HOCView = (props: any) => {

        //高阶组件里面
        useEffect(() => {
            //模拟一些其他的操作，比如营销，上报用户信息等，用于解耦
        }, [])

        return (
            <>
                <OriginView {...props}></OriginView>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        console.log(`onPress ...`);
                    }}>
                    <Image style={styles.addImg} source={icon_add} />
                </TouchableOpacity>

            </>
        )
    }
    return HOCView as T

}

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        bottom: 80,
        right: 28,
    },
    addImg: {
        width: 54,
        height: 54,
        resizeMode: 'contain',
    },
});