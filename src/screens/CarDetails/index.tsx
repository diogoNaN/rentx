import React from "react";

import { Container, Header } from "./styles";

import { BackButton } from "../../components/BackButton";
import { StatusBar } from "react-native";

export const CarDetails: React.FC = () => {
  return (
    <Container>
      <StatusBar barStyle={"dark-content"} />
      <Header>
        <BackButton onPress={() => {}} />
      </Header>
    </Container>
  );
};
