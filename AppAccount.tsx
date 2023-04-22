import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import AccountManager from "./src_account/components/AccountManager.js"

function App(): JSX.Element {

    return (
        <SafeAreaView>
            <StatusBar
                barStyle='dark-content'
                backgroundColor="#ffffff"
            />

            <View style={styles.container}>
                <AccountManager />
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
