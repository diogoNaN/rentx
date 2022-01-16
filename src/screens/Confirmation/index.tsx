import React, { useCallback } from "react";
import { StatusBar, useWindowDimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Container, Content, Title, Message, Footer } from "./styles";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import {
  AppStackRoutesNavigationProps,
  AppStackRoutesParamList,
} from "../../routes/app.stack.routes";

import { ConfirmButton } from "../../components/ConfirmButton";
import { AuthRoutesParamList } from "../../routes/auth.routes";

type Params =
  | AppStackRoutesParamList["Confirmation"]
  | AuthRoutesParamList["Confirmation"];

export const Confirmation: React.FC = () => {
  const route = useRoute();
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation<AppStackRoutesNavigationProps>();

  const {
    title,
    message,
    button: { text = "Ok", onPress },
  } = route.params as Params;

  const handleDoneRental = useCallback(() => {
    onPress();
  }, [navigate, onPress]);

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
        <ConfirmButton title={text} onPress={handleDoneRental} />
      </Footer>
    </Container>
  );
};
