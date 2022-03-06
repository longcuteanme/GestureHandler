import React, {FC} from 'react';
import Svg, {Rect} from 'react-native-svg';
import Animated, {useAnimatedProps} from 'react-native-reanimated';

const DrawCore: FC = props => {
  const {currentItem, visible} = props;
  console.log(currentItem.value);

  const AnimatedRectangle = Animated.createAnimatedComponent(Rect);

  const rectangleAnimatedProps = useAnimatedProps(() => {
    const coordinates = currentItem.value;
    return {
      x: coordinates.x,
      y: coordinates.y,
      width: coordinates.width,
      height: coordinates.height,
      stroke: 'rgb(0,0,0)',
      fill: 'rgb(0,0,255)',
      // opacity: 1,
      strokeWidth: 3,

      marker: 'url(#selection)',
    };
  }, [currentItem.value]);

  return (
    <>
      <Svg width="500" height="500" fillRule="evenodd">
        <AnimatedRectangle animatedProps={rectangleAnimatedProps} />
        {/* {visible ? (
          <Rect
            x={currentItem.x}
            y={currentItem.y}
            width={currentItem.width}
            height={currentItem.height}
            fill="rgb(0,0,255)"
            strokeWidth="3"
            stroke="rgb(0,0,0)"
          />
        ) : null} */}
      </Svg>
    </>
  );
};
export default DrawCore;
