/**
 * @format
 */

import { AppRegistry, Platform, UIManager } from 'react-native';
import App from './AppDemo'; 
// import App from './AppAccount';
// import App from './AppProject';
import { name as appName } from './app.json';

//开启布局动画
if (Platform.OS == "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }
}

AppRegistry.registerComponent(appName, () => App);
