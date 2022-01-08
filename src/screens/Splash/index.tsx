import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import BrandSvg from "../../assets/brand.svg";
import LogoSvg from "../../assets/logo.svg";

import { Container } from "./styles";

export const Splash: React.FC = () => {
  const animation = useSharedValue(0);
  const { navigate } = useNavigation();

  const brandAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animation.value,
        [0, 20, 40, 60, 80, 95, 100],
        [0, 1, 1, 1, 1, 1, 0]
      ),
      transform: [
        {
          translateX: interpolate(
            animation.value,
            [0, 20, 40, 60, 80, 100],
            [0, 0, 0, 75, 75, 75]
          ),
        },
        {
          scale: interpolate(
            animation.value,
            [0, 20, 40, 60, 80, 100],
            [3, 3, 3, 0.385, 0.385, 0.385]
          ),
        },
      ],
    };
  });

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animation.value, [0, 80, 100], [0, 0, 1]),
    };
  });

  const startApp = () => {
    navigate("Home");
  };

  useEffect(() => {
    animation.value = 0;
    animation.value = withTiming(
      100,
      {
        duration: 3000,
      },
      () => {
        "worklet";
        runOnJS(startApp)();
      }
    );
  }, []);

  return (
    <Container>
      <Animated.View style={[brandAnimatedStyle, { position: "absolute" }]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoAnimatedStyle, { position: "absolute" }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
};
