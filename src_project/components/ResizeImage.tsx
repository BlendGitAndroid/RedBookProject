import React, { useState, useEffect } from "react"
import { View, Image, Dimensions } from "react-native"

type Props = {
    uri: string
}

const { width: SCREEN_WIDTH } = Dimensions.get("window")
const SHOW_WIDTH = SCREEN_WIDTH - 18 >> 1;

export default ({ uri }: Props) => {

    const [height, setHeight] = useState<number>(200)

    useEffect(() => {
        Image.getSize(uri, (width: number, height: number) => {
            const showHight = SHOW_WIDTH * height / width
            setHeight(showHight)
        })
    }, [height])

    return <Image style={{
        width: SHOW_WIDTH,
        height: height,
        resizeMode: "cover",
    }} source={{ uri: uri }} />

}