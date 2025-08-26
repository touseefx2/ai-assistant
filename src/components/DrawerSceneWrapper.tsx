import { useDrawerProgress } from '@react-navigation/drawer';
import {
  Platform,
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
  
  const DrawerSceneWrapper = ({children}) => {
    const progress = useDrawerProgress();
    const {width} = useWindowDimensions();
    console.log(progress.value);
  
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        {perspective: 1000},
        {
          scale: interpolate(progress.value, [0, 1], [1, 0.8], 'clamp'),
        },
        {
          rotateY: `${interpolate(progress.value, [0, 1], [0, -10], 'clamp')}deg`,
        },
        {
          translateX: interpolate(
            progress.value,
            [0, 1],
            [0, Platform.OS === 'android' ? width - 130 : -60],
            'clamp',
          ),
        },
      ],
      borderRadius: interpolate(progress.value, [0, 1], [0, 20], 'clamp'),
      overflow: 'hidden',
    }));
  
    return (
      <Animated.View style={[styles.container, animatedStyle]}>
        {children}
      </Animated.View>
    );
  };
  
  export default DrawerSceneWrapper;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  