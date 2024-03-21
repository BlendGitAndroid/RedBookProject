
import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
} from 'react-native';

// 定义Props类型
type Props = {
    info: UserInfo
}

/**
 * 在 React 中，如果一个父组件发生了状态变化并重新渲染，那么它的所有子组件默认情况下也会重新渲染。这是因为 React 的渲染机制是自顶向下的，当一个组
 * 件的状态发生变化时，React 会重新渲染这个组件以及它的所有子组件。
然而，这并不意味着所有的子组件都会在 DOM 中进行实际的更新。React 使用一种称为 "diffing algorithm" 的算法来比较新旧虚拟 DOM 树，只有当实际的输出（
即在浏览器中看到的 UI）发生变化时，React 才会在 DOM 中进行更新。
此外，React 提供了一些优化机制来避免不必要的重新渲染。例如，你可以使用 `shouldComponentUpdate` 生命周期方法（在类组件中）或 `React.memo`（在函数组
件中）来避免子组件的不必要渲染。这些方法允许你指定当 props 或 state 发生变化时是否需要重新渲染组件。
 */
// 在 React 中，当一个组件的 props 发生变化时，React 会重新渲染这个组件。然而，有时候即使 props 发生了变化，组件的输出也可能不变。在这种情况下，
// 重新渲染组件就是一种浪费。React.memo 可以解决这个问题。它接收一个组件作为参数，然后返回一个新的组件。这个新的组件会记住它的 props，并且只有当 
// props 发生变化时才会重新渲染。
//函数式组件避免重复渲染使用memo
export default React.memo((props: Props) => {

    // 解构赋值
    const { info } = props

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
}, (preProps: Props, nextProps: Props) => {
    // 返回true，不渲染，反之，渲染
    return JSON.stringify(preProps.info) === JSON.stringify(nextProps.info)
})


// 下面的这个列子取掉了React.memo，会发现每次点击按钮，都会发生渲染，这是因为Props每次都会发生变化，所以每次都会发生渲染
// export default (props: Props) => {

//     // 解构赋值
//     const { info } = props

//     console.log("render ...")
//     return (
//         <View style={darkStyles.content}>
//             <Image style={darkStyles.img} source={{ uri: info.avatar }} />
//             <Text style={darkStyles.txt}>{info.name}</Text>
//             <View style={darkStyles.infoLayout}>
//                 <Text style={darkStyles.infoTxt}>
//                     {info.desc}
//                 </Text>
//             </View>
//         </View>
//     );
// }

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