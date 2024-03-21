import React, { useEffect } from 'react';

import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

import icon_add from "../assets/images/icon_add.png"


//联合类型
type IReactComponent =
    React.ClassicComponentClass
    | React.ComponentClass
    | React.FunctionComponent
    | React.ForwardRefExoticComponent<any>;

// 这里的T是泛型，表示传入的组件类型,限制传入的组件类型必须是React组件
// 所以高阶组件经常作为一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。
// 高阶组件是函数， 在这个高阶组件函数中，OriginView 是被传入的原始组件，这个函数会对它进行包装，添加一些额外的功能，然后返回一个新的组件
export default <T extends IReactComponent>(OriginView: T): T => {

    // HOC(全称Higher-order component)
    const HOCView = (props: any) => {

        //高阶组件里面
        useEffect(() => {
            //模拟一些其他的操作，比如营销，上报用户信息等，用于解耦
            console.log(props)
        }, [])

        return <>
            {/* 给OriginView传值,这个值就是Header组件的值 */}
            <OriginView {...props}></OriginView>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                    console.log(`onPress ...`);
                }}>
                <Image style={styles.addImg} source={icon_add} />
            </TouchableOpacity>

        </>

    }

    // 这样做的目的是确保高阶组件函数的返回类型与输入类型相同。因为这个函数的签名是 <T extends IReactComponent>(OriginView: T): T，
    // 所以它应该接收一个 T 类型的组件，并返回一个 T 类型的组件。通过使用类型断言 as T，你可以确保这个函数的返回类型与输入类型相同。
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