import React, { useState, useEffect, useRef } from "react"
import { Animated, StyleSheet, Image, TouchableOpacity } from "react-native"

import icon_heart from '../assets/icon_heart.png';
import icon_heart_empty from '../assets/icon_heart_empty.png';

type Props = {
    value: boolean,
    onValueChanged?: (value: boolean) => void,
    size?: number
}

export default (props: Props) => {

    const { value, onValueChanged, size = 20 } = props  //设置size的默认值

    const [showState, setShowState] = useState<boolean>(false)

    const scale = useRef<Animated.Value>(new Animated.Value(0)).current
    const alpha = useRef<Animated.Value>(new Animated.Value(0)).current

    useEffect(() => {
        setShowState(value)
    }, [value])

    const onHeartPress = () => {
        const newState = !showState
        setShowState(newState)
        onValueChanged?.(newState)

        if (newState) {
            alpha.setValue(1);  //先设置为不透明
            const scaleAnim = Animated.timing(scale, {
                toValue: 1.8,   //放大到1.8倍
                duration: 300,
                useNativeDriver: false,
            });

            const alphaAnim = Animated.timing(alpha, {
                toValue: 0, //透明度从透明变到不透明
                duration: 400,
                useNativeDriver: false,
                delay: 200, //延迟200ms开启
            });

            Animated.parallel([scaleAnim, alphaAnim]).start();  //同时开启
        } else {
            scale.setValue(0)
            alpha.setValue(0)
        }
    }

    return <TouchableOpacity
        onPress={onHeartPress}
    >
        <Image
            style={[styles.container, { width: size, height: size }]}
            source={showState ? icon_heart : icon_heart_empty}
        />

        {/* 制作动画 */}
        <Animated.View style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: size / 20, //边框宽度
            borderColor: "#ff2442",
            position: "absolute",   //不占用标准流
            transform: [
                { scale: scale }
            ],
            opacity: alpha
        }}>

        </Animated.View>
    </TouchableOpacity>

}

const styles = StyleSheet.create({

    container: {
        width: 20,
        height: 20,
        resizeMode: "contain"
    }

})