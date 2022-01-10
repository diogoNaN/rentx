import React, { useCallback } from "react";
import { StatusBar, useWindowDimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Container, Content, Title, Message, Footer } from "./styles";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import { ConfirmButton } from "../../components/ConfirmButton";
import { StackRoutesParamList } from "../../routes/stack.routes";

type Params = StackRoutesParamList["Confirmation"];

export const Confirmation: React.FC = () => {
  const route = useRoute();
  const { navigate } = useNavigation();
  const { width } = useWindowDimensions();

  const {
    title,
    message,
    nextScreen: { name, params },
  } = route.params as Params;

  const handleDoneRental = useCallback(() => {
    navigate(name, params);
  }, [navigate]);

  return (
    <Container>
      <StatusBar barStyle={"light-content"} />

      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title={"Ok"} onPress={handleDoneRental} />
      </Footer>
    </Container>
  );
};
