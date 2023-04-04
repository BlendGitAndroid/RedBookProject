import React, { useRef, useEffect, useSatte } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SectionList,
} from 'react-native';

import { SectionData } from '../constants/Data';

export default () => {

    const renderItem = ({ item, index, section }) => {
        return <Text style={styles.txt}>{item}</Text>
    }

    const renderSectionHeader = ({ section }) => {
        return (
            <Text style={styles.sectionHeaderTxt}>{section.type}</Text>
        );
    }

    return <View style={styles.container}>
        <SectionList
            style={styles.container}
            sections={SectionData}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderSectionHeader={renderSectionHeader}
            stickySectionHeadersEnabled={true}  //吸顶的效果
        >

        </SectionList>
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "white"
    },
    txt: {
        width: "100%",
        height: 56,
        color: "#333333",
    },
    sectionHeaderTxt: {
        width: '100%',
        height: 36,
        backgroundColor: '#DDDDDD',
        textAlignVertical: 'center',
        paddingLeft: 16,
        fontSize: 20,
        color: '#333333',
        fontWeight: 'bold',
    },
})