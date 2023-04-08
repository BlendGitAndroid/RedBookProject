
import React, { useState } from 'react';
import {
    View,
    Button
} from 'react-native';

import PageView from './PageView';
import { ThemeContext } from './ThemeContext';

export default () => {

    const [theme, setTheme] = useState("dark")

    //Context注入
    return (
        <ThemeContext.Provider value={theme}>
            <View style={{ width: '100%' }}>

                <Button
                    title='切换主题'
                    onPress={() => {
                        setTheme(state => {
                            if (state == "dark") {
                                return "light"
                            } else {
                                return "dark"
                            }
                        })
                    }}
                    color={"red"}
                />

                <PageView />
            </View>
        </ThemeContext.Provider>
    );
}

