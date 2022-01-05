import React from "react";

import { Container, Header, HeaderContent, TotalCars } from "./styles";

import LogoSvg from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";

export const Home: React.FC = () => {
  return (
    <Container>
      <Header>
        <HeaderContent>
          <LogoSvg width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
    </Container>
  );
};
