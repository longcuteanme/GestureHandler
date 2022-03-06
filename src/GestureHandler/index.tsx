import React, {useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedReaction,
} from 'react-native-reanimated';

import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import DrawCore from './DrawCore';

const SIZE = 100.0;
const CIRCLE_RADIUS = SIZE * 2;

type ContextType = {
  translateX: number;
  translateY: number;
};

export default function App() {
  const [visible, setVisible] = useState(false);
  const currentItem = useSharedValue({x: 0, y: 0, height: 0, width: 0});

  const drawNewItem = (currentItem, position, change) => {
    'worklet';
    currentItem.value = {
      x: position.x,
      y: position.y,
      width: change.width,
      height: change.height,
    };
  };

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: ({x, y}, ctx) => {
      const startX = x;
      const startY = y;
      ctx.startX = startX;
      ctx.startY = startY;
      currentItem.value = {
        x: x,
        y: y,
        height: 0,
        width: 0,
      };
    },
    onActive: ({translationX, translationY}, {startX, startY}) => {
      drawNewItem(
        currentItem,
        {x: startX, y: startY},
        {width: translationX, height: translationY},
      );
      // currentItem.value = {
      //   x: startX,
      //   y: startY,
      //   height: translationY,
      //   width: translationX,
      // };
    },
    onEnd: event => {
      // setVisible(!visible)
      // currentItem.value = {
      //   x: 0,
      //   y: 0,
      //   height: 0,
      //   width: 0,
      // };
    },
  },[],);

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={styles.container}>
          <PanGestureHandler enabled={true} onGestureEvent={panGestureEvent}>
            <Animated.View style={{backgroundColor: 'yellow'}}>
              <DrawCore currentItem={currentItem} visible={visible} />
            </Animated.View>
          </PanGestureHandler>
        </View>
      </GestureHandlerRootView>
      <Button
        title="click"
        onPress={() => {
          setVisible(!visible);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.5)',
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: 'rgba(0, 0, 256, 0.5)',
  },
});
