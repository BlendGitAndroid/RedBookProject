/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import ClassView from './src_demo/components/ClassView';
import FunctionView from './src_demo/components/FunctionView';
import TimerView from './src_demo/components/TimerView';
import TextDemo from './src_demo/components/TextDemo';
import ImageDemo from './src_demo/components/ImageDemo';
import ImageBackgroundDemo from './src_demo/components/ImageBackgroundDemo';
import TextInputDemo from './src_demo/components/TextInputDemo';
import TouchableOpacityDemo from './src_demo/components/TouchableOpacityDemo';
import TouchableHighLightDemo from './src_demo/components/TouchableHighLightDemo';
import ButtonDemo from './src_demo/components/ButtonDemo';
import PressableDemo from './src_demo/components/PressableDemo';
import ScrollViewDemo from './src_demo/components/ScrollViewDemo';
import FlatListViewDemo from './src_demo/components/FlatListViewDemo';
import SectionListDemo from './src_demo/components/SectionListDemo';
import ModalDemo from './src_demo/components/ModalDemo';
import SwitchDemo from './src_demo/components/SwitchDemo';
import TestApi from './src_demo/components/TestApi';
import PersonalInfo from './src_demo/components/PersonalInfo';
import PersonalInfoDemo from './src_demo/components/PersonalInfoDemo';
import AnimDemo from './src_demo/components/AnimDemo';
import AnimShow from './src_demo/components/AnimShow';
import TsDemo from './src_demo/ts/TsDemo';
import ContextView from './src_demo/context/ContextView';
import MemoDemo from './src_demo/memo/MemoDemo';
import RefDemo from './src_demo/ref/RefDemo';
import NativePage from './src_demo/native/NativePage';


function App(): JSX.Element {

  const [showClassView, setShowClassView] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowClassView(false)
  //   }, 2000)
  // })

  return (
    <SafeAreaView>
      <StatusBar
        barStyle='dark-content'
        backgroundColor="#ffffff"
      />

      <View style={styles.container}>
        {/* {showClassView && <ClassView />} */}
        {/* <FunctionView name = "Blend" age = {30}></FunctionView> */}
        {/* {<TimerView />} */}
        {/* <TextDemo /> */}
        {/* <ImageDemo /> */}
        {/* <ImageBackgroundDemo/> */}
        {/* <TextInputDemo/> */}

        {/* 四种按钮组件 */}
        {/* <TouchableOpacityDemo /> */}
        {/* <TouchableHighLightDemo/> */}
        {/* <ButtonDemo/> */}
        {/* <PressableDemo/> */}

        {/* <ScrollViewDemo/> */}
        {/* <FlatListViewDemo/> */}
        {/* <SectionListDemo/> */}

        {/* <ModalDemo/> */}
        {/* <SwitchDemo/> */}
        {/* <PersonalInfo /> */}
        {/* <PersonalInfoDemo/> */}
        {/* <TestApi /> */}

        {/* <AnimDemo/> */}
        {/* <AnimShow/> */}

        <TsDemo/>
        {/* <ContextView /> */}
        {/* <MemoDemo /> */}
        {/* <RefDemo /> */}

        {/* <NativePage /> */}
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
