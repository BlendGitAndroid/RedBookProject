/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import AccountHome from "./src_account/components/AccountHome"

function App(): JSX.Element {

    return (
        <SafeAreaView>
            <StatusBar
                barStyle='dark-content'
                backgroundColor="#ffffff"
            />

            <View style={styles.container}>
                <AccountHome />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
    }
});

export default App;
