import React from "react";
import LottieView from "lottie-react-native";

import { Container } from "./styles";

import carAnimation from "../../assets/animations/car.json";

type LoadProps = {};

export const LoadAnimation: React.FC<LoadProps> = (props) => {
  return (
    <Container>
      <LottieView
        autoPlay
        loop={false}
        resizeMode="contain"
        source={carAnimation}
        style={{ height: 200 }}
      />
    </Container>
  );
};
