import React from "react";
import { TouchableOpacityProps } from "react-native";

import GasolineSvg from "../../assets/gasoline.svg";

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

type Car = {
  name: string;
  brand: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
};

type CarProps = TouchableOpacityProps & {
  data: Car;
};

export const Car: React.FC<CarProps> = (props) => {
  const { data, ...rest } = props;

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>
        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>
          <Type>
            <GasolineSvg />
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
