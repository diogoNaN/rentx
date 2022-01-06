import styled from "styled-components/native";
import { Dimensions, TouchableOpacity } from "react-native";

type IndexProps = {
  active: boolean;
};

export const Container = styled.View`
  width: 100%;
`;

export const Indexes = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: 24px;
`;

export const Index = styled.View<IndexProps>`
  width: 6px;
  height: 6px;

  background-color: ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.shape};

  margin-left: 8px;
  border-radius: 3px;
`;

export const CarWrapper = styled.View`
  width: ${Dimensions.get("window").width}px;
  height: 132px;

  align-items: center;
  justify-content: center;
`;

export const CarImage = styled.Image`
  width: 280px;
  height: 132px;
`;
