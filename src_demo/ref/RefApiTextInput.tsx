import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    LayoutAnimation,
    TouchableOpacity,
} from 'react-native';

import icon_error from '../assets/images/icon_error.png';
import icon_right from '../assets/images/icon_right.png';
import icon_question from '../assets/images/icon_question.webp';
import icon_delete from '../assets/images/icon_delete.png';

// 定义接口方法,这里是方法的定义
export interface RefApi {
    focus: () => void,
    blur: () => void
}

//定义泛型，ref的类型是TextInput
export default forwardRef<RefApi, any>((props, ref) => {

    const [value, setValue] = useState<string>('');

    // 内部定义的ref
    const textInput = useRef<TextInput>(null)

    const myFocus = () => {
        textInput.current?.focus()
    }

    const myBlur = () => {

    }

    // `useImperativeHandle` 是 React 的一个 Hook，用于自定义暴露给父组件的实例值或方法。
    // 它可以让你在函数组件中通过使用 `ref`，控制要暴露给父组件的实例。
    // 那这里方法的实现
    useImperativeHandle(ref, () => {
        return {
            focus: myFocus,
            blur: myBlur
        }
    })

    return (
        <View style={styles.root}>
            <View
                style={[
                    styles.inputWrap,
                    {
                        borderColor: !value
                            ? '#888'
                            : value?.length === 11
                                ? '#00CD00'
                                : '#ff3050'
                    }
                ]}>
                <TextInput
                    ref={textInput}
                    style={styles.input}
                    value={value}
                    keyboardType='number-pad'
                    onChangeText={value => {
                        LayoutAnimation.spring();
                        setValue(value);
                    }}
                    maxLength={11}
                />

                {!!value &&
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => {
                            LayoutAnimation.spring();
                            setValue('');
                        }}
                    >
                        <Image style={styles.deleteImg} source={icon_delete} />
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.tipsLayout}>
                {!value ?
                    <>
                        <Image style={styles.tipImg} source={icon_question} />
                        <Text style={styles.tipsTxt}>请输入您的手机号</Text>
                    </> : value.length === 11 ?
                        <>
                            <Image style={styles.tipImgRight} source={icon_right} />
                            <Text style={styles.tipsTxtRight}>输入正确，可进行提交</Text>
                        </> :
                        <>
                            <Image style={styles.tipImgError} source={icon_error} />
                            <Text style={styles.tipsTxtError}>格式错误，请输入正确手机号</Text>
                        </>}
            </View>
        </View>
    );
})

const styles = StyleSheet.create({
    root: {
        width: '100%',
        flexDirection: 'column',
    },
    input: {
        width: '100%',
        height: 56,
        backgroundColor: 'transparent',
        paddingHorizontal: 16,
        fontSize: 22,
        color: '#333',
    },
    inputWrap: {
        width: '100%',
        borderWidth: 2,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tipsLayout: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        paddingHorizontal: 6,
    },
    tipImg: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
        tintColor: '#888',
    },
    tipsTxt: {
        fontSize: 15,
        color: '#666',
        marginLeft: 6,
        fontWeight: 'bold',
    },
    tipImgRight: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
        tintColor: '#00CD00',
    },
    tipsTxtRight: {
        fontSize: 15,
        color: '#00CD00',
        marginLeft: 6,
        fontWeight: 'bold',
    },
    tipImgError: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
        tintColor: '#ff3050',
    },
    tipsTxtError: {
        fontSize: 15,
        color: '#ff3050',
        marginLeft: 6,
        fontWeight: 'bold',
    },
    deleteButton: {
        position: 'absolute',
        right: 16,
    },
    deleteImg: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        borderRadius: 12,
    },
});
