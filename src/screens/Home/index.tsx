import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { api } from "../../services/api";

import LogoSvg from "../../assets/logo.svg";

import {
  CarList,
  Container,
  Header,
  HeaderContent,
  TotalCars,
  MyCarsButton,
} from "./styles";

import { Car } from "../../components/Car";

import { CarDTO } from "../../dtos/CarDTO";
import { Load } from "../../components/Load";

type Car = CarDTO & {};

export const Home: React.FC = () => {
  const theme = useTheme();
  const { navigate } = useNavigation();

  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<Car[]>([]);

  const totalCars = useMemo(() => {
    const total = cars.length;

    if (total === 0) {
      return "Nenhum carro";
    }

    return total === 1 ? `Total de 1 carro` : `Total de ${total} carros`;
  }, [cars]);

  const handlePressOnCar = useCallback(
    (car: Car) => {
      navigate("CarDetails", { car });
    },
    [navigate]
  );

  const handleOpenMyCars = useCallback(() => {
    navigate("MyCars");
  }, [navigate]);

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
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handlePressOnCar(item)} />
          )}
        />
      )}

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
      </MyCarsButton>
    </Container>
  );
};
