/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
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
        {/* {showClassView && <ClassView/>} */}
        {/* <FunctionView name = "Blend" age = {30}></FunctionView> */}
        {/* {<TimerView/>} */}
        {/* <TextDemo /> */}
        {/* <ImageDemo /> */}
        {/* <ImageBackgroundDemo/> */}
        <TextInputDemo/>
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
