import styled from "styled-components/native";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.header};

  padding-top: 96px;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding-bottom: 80px;
`;

export const Title = styled.Text`
  margin-top: 40px;

  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.shape};
`;

export const Message = styled.Text`
  margin-top: 16px;

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text_detail};
  line-height: ${RFValue(25)}px;
  text-align: center;
`;

export const Footer = styled.View`
  width: 100%;
  align-items: center;

  margin: 80px 0;
`;
