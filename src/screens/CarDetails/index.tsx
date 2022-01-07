import React, { useCallback } from "react";
import { StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

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

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

type Params = {
  car: CarDTO;
};

export const CarDetails: React.FC = () => {
  const route = useRoute();
  const { navigate, goBack } = useNavigation();

  const { car } = route.params as Params;

  const handleConfirDetails = useCallback(() => {
    navigate("Scheduling", { car });
  }, [navigate, car]);

  return (
    <Container>
      <StatusBar barStyle={"dark-content"} />
      <Header>
        <BackButton onPress={goBack} />
      </Header>

      <CarImages>
        <ImageSlider images={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((item) => (
            <Accessory
              key={item.name}
              name={item.name}
              icon={getAccessoryIcon(item.type)}
            />
          ))}
        </Accessories>

        <About>{car.about}</About>
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
