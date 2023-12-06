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
import SearchGoods from './src_project/modules/searchGoods/SearchGoods';

//创建原生堆栈导航 Stack
//原生堆栈导航 Stack，是用来创建页面和收集该导航下有哪些页面的
//创建页面用的是 Stack.Screen 组件，收集页面用的是 Stack.Navigator 组件。
const Stack = createStackNavigator();

function App(): JSX.Element {

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle='dark-content'
        backgroundColor="#ffffff"
      />

      {/* 容器组件，放在最外层包裹住整个 App 的 JSX 元素 */}
      <NavigationContainer>
        {/* 收集页面用的是 Stack.Navigator 组件 */}
        <Stack.Navigator
          initialRouteName=''
          screenOptions={{
            cardStyle: {
              elevation: 1, //设置页面层级，防止页面混乱
            }
          }}
        >
          {/* 页面名字和函数组件名字用的叫法是一样的，这只是为了好理解，实际上页面名字和组件名字可以取不同的名字，甚至你可以通过同一个组件来创建多个页面 */}
          {/* initialParams 对象和 params 对象会进行对象合并，而不是覆盖， */}
          {/* initialParams 属性的作用是，给页面设置默认的且可覆盖的 params 自定义参数 */}
          {/* 使用 navigation.setParams 重置自定义 params 参数时，会将新旧 params 对象进行合并，并使用合并后的 params 重新渲染页面。 */}
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

          <Stack.Screen
            name='SearchGoods'
            component={SearchGoods}
            options={{
              headerShown: false,
              presentation: 'transparentModal', //这里采用透明模式，来分别实现购物页和搜索页的展示
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider >
  );
}


export default App;
