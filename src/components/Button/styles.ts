import styled from "styled-components/native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

type ContainerProps = TouchableOpacityProps & {
  color: string;
};

type TitleProps = {
  light: boolean;
};

export const Container = styled(TouchableOpacity).attrs<TouchableOpacityProps>({
  activeOpacity: 0.7,
})<ContainerProps>`
  width: 100%;

  padding: 19px;
  align-items: center;
  justify-content: center;

  background-color: ${({ color }) => color};
`;

export const Title = styled.Text<TitleProps>`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme, light }) =>
    light ? theme.colors.header : theme.colors.shape};
`;
