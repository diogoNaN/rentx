import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, StatusBar } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { format, parseISO } from "date-fns";

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";

import { api } from "../../services/api";
import { Car as ModelCar } from "../../database/models/Car";

import { Car } from "../../components/Car";
import { LoadAnimation } from "../../components/LoadAnimation";
import { BackButton } from "../../components/BackButton";

type ScheduleProps = {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
};

export const MyCars: React.FC = () => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const { navigate, goBack } = useNavigation();

  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useState<ScheduleProps[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadRentals = async () => {
      try {
        setLoading(true);

        const response = await api.get("/rentals");

        setLoading(false);
        setSchedules(response.data);
      } catch (error) {
        console.log(error);
        if (isMounted) {
          setLoading(false);
          Alert.alert("Ops", "Não foi possível obter os agendamentos");
        }
      }
    };

    loadRentals();

    return () => {
      isMounted = false;
    };
  }, [isFocused]);

  return (
    <Container>
      <StatusBar barStyle={"dark-content"} />
      <Header>
        <BackButton onPress={goBack} color={theme.colors.shape} />

        <Title>
          Escolha uma {"\n"}
          data de início e {"\n"}
          fim do aluguel
        </Title>

        <SubTitle>Conforto, segurança e praticidade</SubTitle>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{schedules.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={schedules}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>
                      {format(parseISO(item.start_date), "dd/MM/yyyy")}
                    </CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>
                      {format(parseISO(item.end_date), "dd/MM/yyyy")}
                    </CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
};
