import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import { useTheme } from "styled-components";
// import Animated, {
//   useAnimatedGestureHandler,
//   useAnimatedStyle,
//   useSharedValue,
// } from "react-native-reanimated";
// import { PanGestureHandler } from "react-native-gesture-handler";

import { api } from "../../services/api";

import LogoSvg from "../../assets/logo.svg";

import { CarList, Container, Header, HeaderContent, TotalCars } from "./styles";

import { AppStackRoutesNavigationProps } from "../../routes/app.stack.routes";

import { Car } from "../../components/Car";
import { LoadAnimation } from "../../components/LoadAnimation";

import { CarDTO } from "../../dtos/CarDTO";

type Car = CarDTO & {};

export const Home: React.FC = () => {
  const { navigate } = useNavigation<AppStackRoutesNavigationProps>();
  // const myCarsButtomPositionX = useSharedValue(0);
  // const myCarsButtomPositionY = useSharedValue(0);

  // const onGestureEvent = useAnimatedGestureHandler({
  //   onStart(_, ctx: any) {
  //     ctx.x = myCarsButtomPositionX.value;
  //     ctx.y = myCarsButtomPositionY.value;
  //   },
  //   onActive(event, ctx: any) {
  //     myCarsButtomPositionX.value = ctx.x + event.translationX;
  //     myCarsButtomPositionY.value = ctx.y + event.translationY;
  //   },
  //   onEnd() {},
  // });

  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<Car[]>([]);

  // const myCarsAnimatedStyle = useAnimatedStyle(() => ({
  //   transform: [
  //     { translateX: myCarsButtomPositionX.value },
  //     { translateY: myCarsButtomPositionY.value },
  //   ],
  // }));

  const totalCars = useMemo(() => {
    const total = cars.length;

    if (total === 0) {
      return "Nenhum carro";
    }

    return total === 1 ? `Total de 1 carro` : `Total de ${total} carros`;
  }, [cars]);

  const backHandler = useCallback(() => {
    return true;
  }, []);

  const handlePressOnCar = useCallback(
    (car: Car) => {
      navigate("CarDetails", { car });
    },
    [navigate, backHandler]
  );

  const loadCars = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get("/cars");

      setCars(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível buscar os carros");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <LogoSvg width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>{totalCars}</TotalCars>
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handlePressOnCar(item)} />
          )}
        />
      )}

      {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsAnimatedStyle,
            {
              position: "absolute",
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <MyCarsButton onPress={handleOpenMyCars}>
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </MyCarsButton>
        </Animated.View>
      </PanGestureHandler> */}
    </Container>
  );
};
