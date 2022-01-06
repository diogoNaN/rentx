import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";

import LogoSvg from "../../assets/logo.svg";

import {
  CarList,
  CarProps,
  Container,
  Header,
  HeaderContent,
  TotalCars,
} from "./styles";

import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";

export const Home: React.FC = () => {
  const { navigate } = useNavigation();

  const [cars, setCars] = useState<CarProps[]>([]);

  const totalCars = useMemo(() => {
    const total = cars.length;

    if (total === 0) {
      return "Nenhum carro";
    }

    return total === 1 ? `Total de 1 carro` : `Total de ${total} carros`;
  }, [cars]);

  const handlePressOnCar = useCallback(
    (car: CarProps) => {
      navigate("CarDetails");
    },
    [navigate]
  );

  const loadCars = useCallback(async () => {
    setCars([
      {
        id: "1",
        brand: "Audi",
        name: "Audi R5",
        rent: {
          period: "1 dia",
          price: 175.9,
        },
        thumbnail: "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
      },
    ]);
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

      <CarList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Car data={item} onPress={() => handlePressOnCar(item)} />
        )}
      />
    </Container>
  );
};
