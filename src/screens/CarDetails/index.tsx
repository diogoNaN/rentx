import React, { useCallback } from "react";
import { StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import {
  Container,
  Header,
  CarImages,
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

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

import { CarDTO } from "../../dtos/CarDTO";

type Params = {
  car: CarDTO;
};

export const CarDetails: React.FC = () => {
  const theme = useTheme();
  const route = useRoute();
  const { navigate, goBack } = useNavigation();

  const { car } = route.params as Params;

  const scrollY = useSharedValue(0);
  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, 200], [200, 96], Extrapolate.CLAMP),
  }));
  const carImagesAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 100], [1, 0], Extrapolate.CLAMP),
  }));

  const handleConfirmDetails = useCallback(() => {
    navigate("Scheduling", { car });
  }, [navigate, car]);

  return (
    <Container>
      <StatusBar barStyle={"dark-content"} />
      <Animated.View
        style={[
          headerAnimatedStyle,
          {
            backgroundColor: theme.colors.background_secondary,
            position: "absolute",
            overflow: "hidden",
            zIndex: 1,
          },
        ]}
      >
        <Header>
          <BackButton onPress={goBack} />
        </Header>

        <Animated.View style={carImagesAnimatedStyle}>
          <CarImages>
            <ImageSlider images={car.photos} />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          padding: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
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

        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmDetails}
        />
      </Footer>
    </Container>
  );
};
