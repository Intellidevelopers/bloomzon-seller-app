import { View, Text, Pressable, StyleSheet, PressableProps } from 'react-native';
import React, { useEffect } from 'react';
import { icons } from '../assets/icons';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface TabBarButtonProps extends PressableProps {
  isFocused: boolean;
  label: string | ((props: { focused: boolean; color: string; children: string }) => React.ReactNode);
  routeName: string;
  color: string;
}

const TabBarButton: React.FC<TabBarButtonProps> = ({ isFocused, label, routeName, color, ...rest }) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 });
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4]);
    const top = interpolate(scale.value, [0, 1], [0, 8]);

    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity,
    };
  });

  const renderLabel = () => {
    if (typeof label === 'function') {
      return label({ focused: isFocused, color, children: routeName });
    }
    return <Text style={{ color, fontSize: 11 }}>{label}</Text>;
  };

  return (
    <Pressable {...rest} style={[styles.container, rest.style]}>
      <Animated.View style={animatedIconStyle}>
        {icons[routeName]({ color })}
      </Animated.View>
      <Animated.Text style={[{ color, fontSize: 11 }, animatedTextStyle]}>
        {renderLabel()}
      </Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
});

export default TabBarButton;
