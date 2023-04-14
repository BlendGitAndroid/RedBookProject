import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import {
  StatusBar,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Welcome from './src_project/modules/welcome/Welcome';
import Login from './src_project/modules/login/Login';
import MainTab from './src_project/modules/mainTab/MainTab';
import ArticleDetail from './src_project/modules/articleDetail/ArticleDetail';


const Stack = createStackNavigator();

function App(): JSX.Element {

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle='dark-content'
        backgroundColor="#ffffff"
      />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName=''
          screenOptions={{
            cardStyle: {
              elevation: 1, //设置页面层级，防止页面混乱
            }
          }}
        >
          <Stack.Screen
            name='Welcome'
            component={Welcome}
            options={{
              headerShown: false
            }}
          />

          <Stack.Screen
            name='Login'
            component={Login}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS  //页面出现方式
            }}
          />

          <Stack.Screen
            name='MainTab'
            component={MainTab}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS
            }}
          />

          <Stack.Screen
            name='ArticleDetail'
            component={ArticleDetail}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider >
  );
}


export default App;
