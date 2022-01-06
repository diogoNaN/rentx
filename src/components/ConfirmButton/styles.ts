import styled from "styled-components/native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

type ContainerProps = TouchableOpacityProps & {};

export const Container = styled(TouchableOpacity).attrs<TouchableOpacityProps>({
  activeOpacity: 0.7,
})<ContainerProps>`
  width: 80px;
  height: 56px;

  background-color: ${({ theme }) => theme.colors.shape_dark};

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.shape};
`;
