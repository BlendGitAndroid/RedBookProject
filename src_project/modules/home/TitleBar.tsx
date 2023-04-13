import React, { useState, useEffect, useRef } from "react"
import { Text, StyleSheet, Image, TouchableOpacity, View } from "react-native"

import icon_daily from '../../assets/icon_daily.png';
import icon_search from '../../assets/icon_search.png';

type Props = {
    tab: number
    onTabChanged: (tabIndex: number) => void
}

export default (props: Props) => {

    const { tab, onTabChanged } = props

    const [tabIndex, setIndexTab] = useState<number>(1)

    useEffect(() => {
        setIndexTab(tab)
    }, [tab])

    return <View style={styles.titleLayout}>
        <TouchableOpacity
            style={styles.dailyButton}
        >
            <Image style={styles.icon} source={icon_daily} />
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.tabButton}
            onPress={() => {
                setIndexTab(0)
                onTabChanged?.(0)
            }}
        >
            <Text style={tabIndex == 0 ? styles.tabTxtSelected : styles.tabTxt} >关注</Text>
            {tabIndex == 0 && <View style={styles.line}></View>}
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.tabButton}
            onPress={() => {
                setIndexTab(1)
                onTabChanged?.(1)
            }}
        >
            <Text style={tabIndex == 1 ? styles.tabTxtSelected : styles.tabTxt} >发现</Text>
            {tabIndex == 1 && <View style={styles.line}></View>}
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.tabButton}
            onPress={() => {
                setIndexTab(2)
                onTabChanged?.(2)
            }}
        >
            <Text style={tabIndex == 2 ? styles.tabTxtSelected : styles.tabTxt} >杭州</Text>
            {tabIndex == 2 && <View style={styles.line}></View>}
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.searchButton}
        >
            <Image style={styles.icon} source={icon_search} />
        </TouchableOpacity>
    </View >

}

const styles = StyleSheet.create({
    titleLayout: {
        width: "100%",
        height: 48,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 16
    },
    dailyButton: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 12,
        marginRight: 42,
    },
    icon: {
        width: 28,
        height: 28,
    },
    searchButton: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 12,
        marginLeft: 42,
    },
    tabButton: {
        flex: 1,
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    tabTxt: {
        fontSize: 16,
        color: '#999',
    },
    tabTxtSelected: {
        fontSize: 17,
        color: '#333',
    },
    line: {
        width: 28,
        height: 2,
        borderRadius: 1,
        backgroundColor: "#ff2442",
        position: "absolute",
        bottom: 6
    }
})