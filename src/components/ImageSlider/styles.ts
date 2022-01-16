import styled from "styled-components/native";
import { Dimensions } from "react-native";
import FastImage from "react-native-fast-image";

export const Container = styled.View`
  width: 100%;
`;

export const Bullets = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: 24px;
`;

export const CarWrapper = styled.View`
  width: ${Dimensions.get("window").width}px;
  height: 132px;

  align-items: center;
  justify-content: center;
`;

export const CarImage = styled(FastImage)`
  width: 280px;
  height: 132px;
`;
