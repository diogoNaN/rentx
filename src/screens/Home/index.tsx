import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";
import { synchronize } from "@nozbe/watermelondb/sync";
// import { Ionicons } from "@expo/vector-icons";
// import { useTheme } from "styled-components";
// import Animated, {
//   useAnimatedGestureHandler,
//   useAnimatedStyle,
//   useSharedValue,
// } from "react-native-reanimated";
// import { PanGestureHandler } from "react-native-gesture-handler";

import { api } from "../../services/api";
import { database } from "../../database";
import { Car as ModelCar } from "../../database/models/Car";

import LogoSvg from "../../assets/logo.svg";

import {
  CarList,
  Container,
  Header,
  HeaderContent,
  TotalCars,
  ICar,
} from "./styles";

import { AppStackRoutesNavigationProps } from "../../routes/app.stack.routes";

import { Car } from "../../components/Car";
import { LoadAnimation } from "../../components/LoadAnimation";

export const Home: React.FC = () => {
  const netInfo = useNetInfo();
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
  const [cars, setCars] = useState<ICar[]>([]);

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

  const handlePressOnCar = useCallback(
    (car: ICar) => {
      navigate("CarDetails", { car });
    },
    [navigate]
  );

  const offlineSynchronize = useCallback(async () => {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `/cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );

        const { changes, latestVersion } = response.data;

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post("/users/sync", user);
      },
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadCars = async () => {
      try {
        setLoading(true);

        const carCollection = database.get<ModelCar>("cars");

        const cars = await carCollection.query().fetch();

        if (isMounted) {
          const formattedData: ICar[] = cars.map((item) => ({
            id: item.id,
            name: item.name,
            brand: item.brand,
            fuel_type: item.fuel_type,
            about: item.about,
            period: item.period,
            price: item.price,
            thumbnail: item.thumbnail,
          }));

          setCars(formattedData);
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Ops", "Não foi possível buscar os carros");
      } finally {
        setLoading(false);
      }
    };

    loadCars();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);

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
