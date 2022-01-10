import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

type ContainerProps = {
  isFocused: boolean;
};

export const Container = styled.View<ContainerProps>`
  flex-direction: row;

  border-bottom-width: 2px;
  border-bottom-color: ${({ theme, isFocused }) =>
    isFocused ? theme.colors.main : "transparent"};
`;

export const IconContainer = styled.View`
  height: 56px;
  width: 55px;

  align-items: center;
  justify-content: center;

  margin-right: 2px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const InputText = styled.TextInput`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  padding: 0 23px;

  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
`;
