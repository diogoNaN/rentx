import React, { useCallback } from "react";
import { StatusBar } from "react-native";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  About,
  Footer,
} from "./styles";

import SpeedSvg from "../../assets/speed.svg";
import AccelerationSvg from "../../assets/acceleration.svg";
import ForceSvg from "../../assets/force.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import ExchangeSvg from "../../assets/exchange.svg";
import PeopleSvg from "../../assets/people.svg";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

export const CarDetails: React.FC = () => {
  const { navigate, goBack } = useNavigation();

  const handleConfirDetails = useCallback(() => {
    navigate("Scheduling");
  }, [navigate]);

  return (
    <Container>
      <StatusBar barStyle={"dark-content"} />
      <Header>
        <BackButton onPress={goBack} />
      </Header>

      <CarImages>
        <ImageSlider
          images={[
            "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
            "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
            "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
            "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
          ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Audi</Brand>
            <Name>Huracan</Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 245</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name={"380km/h"} icon={SpeedSvg} />
          <Accessory name={"3.2s"} icon={AccelerationSvg} />
          <Accessory name={"800 HP"} icon={ForceSvg} />
          <Accessory name={"Gasolina"} icon={GasolineSvg} />
          <Accessory name={"Auto"} icon={ExchangeSvg} />
          <Accessory name={"2 pessoas"} icon={PeopleSvg} />
        </Accessories>

        <About>
          Este é automóvel desportivo. Surgiu do lendário touro de lide
          indultado na praça Real Maestranza de Sevilla. É um belíssimo carro
          para quem gosta de acelerar.
        </About>
      </Content>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirDetails}
        />
      </Footer>
    </Container>
  );
};
