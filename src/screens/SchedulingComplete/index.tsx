import React, { useCallback } from "react";
import { StatusBar, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Container, Content, Title, Message, Footer } from "./styles";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import { ConfirmButton } from "../../components/ConfirmButton";

export const SchedulingComplete: React.FC = () => {
  const { navigate } = useNavigation();
  const { width } = useWindowDimensions();

  const handleDoneRental = useCallback(() => {
    navigate("Home");
  }, [navigate]);

  return (
    <Container>
      <StatusBar barStyle={"light-content"} />

      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {"\n"}
          até a concessionária da RENTX {"\n"}
          pegar o seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title={"Ok"} onPress={handleDoneRental} />
      </Footer>
    </Container>
  );
};
