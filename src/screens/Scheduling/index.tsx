import React, { useCallback, useState } from "react";
import { Alert, StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { format, startOfDay, endOfDay } from "date-fns";

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from "./styles";

import ArrowSvg from "../../assets/arrow.svg";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps,
} from "../../components/Calendar";

import { CarDTO } from "../../dtos/CarDTO";

type RentalPeriod = {
  start: number;
  startFormatted: string;
  end: number;
  endFormatted: string;
};

type Params = {
  car: CarDTO;
};

export const Scheduling: React.FC = () => {
  const theme = useTheme();
  const route = useRoute();
  const { navigate, goBack } = useNavigation();

  const { car } = route.params as Params;

  const [lastDate, setLastDate] = useState({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({});
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const handleChangeDate = useCallback(
    (date: DayProps) => {
      let start = !lastDate.timestamp ? date : lastDate;
      let end = date;

      if (start.timestamp > end.timestamp) {
        start = end;
      }

      setLastDate(date);

      const interval = generateInterval(start, end);

      setMarkedDates(interval);
      setRentalPeriod({
        start: start.timestamp,
        startFormatted: format(start.timestamp, "dd/MM/yyyy"),
        end: end.timestamp,
        endFormatted: format(end.timestamp, "dd/MM/yyyy"),
      });
    },
    [lastDate]
  );

  const handleConfirmPeriod = useCallback(() => {
    if (!rentalPeriod.start || !rentalPeriod.end) {
      Alert.alert("Ops", "Escolha o período para alugar");
    } else {
      navigate("SchedulingDetails", {
        car,
        period: {
          start: String(startOfDay(rentalPeriod.start)),
          end: String(endOfDay(rentalPeriod.end)),
        },
      });
    }
  }, [rentalPeriod, navigate, markedDates]);

  return (
    <Container>
      <StatusBar barStyle={"light-content"} />
      <Header>
        <BackButton onPress={goBack} color={theme.colors.shape} />

        <Title>
          Escolha uma {"\n"}
          data de início e {"\n"}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected={!!rentalPeriod.start}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={!!rentalPeriod.end}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmPeriod}
          enabled={!!rentalPeriod.start && !!rentalPeriod.end}
        />
      </Footer>
    </Container>
  );
};
