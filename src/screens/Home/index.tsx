import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";

import LogoSvg from "../../assets/logo.svg";

import { CarList, Container, Header, HeaderContent, TotalCars } from "./styles";

import { CardCar } from "../../components/CardCar";

type Car = {
  id: string;
  name: string;
  brand: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
};

export const Home: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <LogoSvg width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={cars}
        keyExtractor={(item, index) => item[index]}
        renderItem={({ item }) => <CardCar data={item} />}
      />
    </Container>
  );
};
