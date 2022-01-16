import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { useNetInfo } from "@react-native-community/netinfo";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

import { ICar } from "../../screens/Home/styles";

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from "./styles";

type CarProps = RectButtonProps & {
  data: ICar;
};

export const Car: React.FC<CarProps> = (props) => {
  const { isConnected } = useNetInfo();

  const { data, ...rest } = props;

  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>
        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${isConnected === true ? data.price : "..."}`}</Price>
          </Rent>
          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>
      <CarImage
        source={{
          uri: data.thumbnail,
        }}
        resizeMode="contain"
      />
    </Container>
  );
};
