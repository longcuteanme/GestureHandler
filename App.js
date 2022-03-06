/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import GestureHandler from './src/GestureHandler/index.tsx';
import {SafeAreaView} from 'react-native';
import DrawCore from './src/GestureHandler/DrawCore';

const App: () => Node = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <GestureHandler />
      {/* <DrawCore/> */}
    </SafeAreaView>
  );
};

export default App;
