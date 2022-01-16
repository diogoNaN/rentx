import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList, FlatListProps } from "react-native";
import Animated from "react-native-reanimated";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";

export type ICar = {
  id: string;
  name: string;
  brand: string;
  about: string;
  fuel_type: string;
  period: string;
  price: number;
  thumbnail: string;
};

type CarListProps = FlatListProps<ICar> & {};

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;

  background-color: ${({ theme }) => theme.colors.header};

  justify-content: flex-end;
  padding: 32px 24px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const CarList = styled(FlatList as new () => FlatList<ICar>).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showVerticalScrollIndicator: false,
})<CarListProps>``;

export const MyCarsButton = styled(
  Animated.createAnimatedComponent(RectButton)
).attrs({
  activeOpacity: 0.7,
})`
  width: 60px;
  height: 60px;

  border-radius: 30px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.main};
`;
