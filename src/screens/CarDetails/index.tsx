import React, { useCallback, useEffect, useState } from "react";
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
  OfflineInfo,
} from "./styles";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

import {
  AppStackRoutesParamList,
  AppStackRoutesNavigationProps,
} from "../../routes/app.stack.routes";
import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";
import { useNetInfo } from "@react-native-community/netinfo";

type Params = AppStackRoutesParamList["CarDetails"];

export const CarDetails: React.FC = () => {
  const theme = useTheme();
  const route = useRoute();
  const { isConnected } = useNetInfo();
  const { navigate, goBack } = useNavigation<AppStackRoutesNavigationProps>();

  const [carData, setCarData] = useState<CarDTO>({} as CarDTO);

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
    navigate("Scheduling", { car: carData });
  }, [navigate, carData]);

  useEffect(() => {
    let isMounted = true;

    const getCarData = async () => {
      const response = await api.get(`/cars/${car.id}`);

      if (isMounted) {
        setCarData(response.data);
      }
    };

    if (isConnected === true) {
      getCarData();
    }

    return () => {
      isMounted = false;
    };
  }, [isConnected]);

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
            <ImageSlider
              images={
                !!carData.photos
                  ? carData.photos
                  : [
                      {
                        id: car.thumbnail,
                        photo: car.thumbnail,
                      },
                    ]
              }
            />
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
            <Period>{car.period}</Period>
            <Price>R$ {isConnected === true ? carData.price : "..."}</Price>
          </Rent>
        </Details>

        {carData.accessories && (
          <Accessories>
            {carData.accessories.map((item) => (
              <Accessory
                key={item.name}
                name={item.name}
                icon={getAccessoryIcon(item.type)}
              />
            ))}
          </Accessories>
        )}

        <About>{car.about}</About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmDetails}
          disabled={isConnected === false}
        />
        {isConnected === false && (
          <OfflineInfo>
            Conecte-se à internet para ver mais detalhes e prosseguir com o
            aluguel do carro.
          </OfflineInfo>
        )}
      </Footer>
    </Container>
  );
};
