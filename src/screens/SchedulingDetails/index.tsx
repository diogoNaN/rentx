import React, { useCallback, useMemo, useState } from "react";
import { Alert, StatusBar } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { format, eachDayOfInterval } from "date-fns";

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
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from "./styles";
import theme from "../../styles/theme";

import { api } from "../../services/api";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

import { StackRoutesParamList } from "../../routes/stack.routes";

type Params = StackRoutesParamList["SchedulingDetails"];

export const SchedulingDetails: React.FC = () => {
  const route = useRoute();
  const { navigate, goBack } = useNavigation();

  const [loading, setLoading] = useState(false);

  const { car, period } = route.params as Params;

  const parsedPeriod = useMemo(() => {
    return {
      start: new Date(period.start),
      end: new Date(period.end),
    };
  }, [period]);

  const formattedPeriod = useMemo(() => {
    return {
      start: format(parsedPeriod.start, "dd/MM/yyyy"),
      end: format(parsedPeriod.end, "dd/MM/yyyy"),
    };
  }, [parsedPeriod]);

  const dates = useMemo(() => {
    const days = eachDayOfInterval({
      start: parsedPeriod.start,
      end: parsedPeriod.end,
    });

    const daysFormatted = days.map((day) => format(day, "yyyy-MM-dd"));

    return {
      days,
      days_formatted: daysFormatted,
      total: days.length,
    };
  }, [parsedPeriod]);

  const handleCreateRental = useCallback(async () => {
    setLoading(true);

    try {
      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

      const formData = {
        id: car.id,
        unavailable_dates: [
          ...schedulesByCar.data.unavailable_dates,
          ...dates.days_formatted.filter(
            (day) => !schedulesByCar.data.unavailable_dates.includes(day)
          ),
        ],
      };

      await api.post(`/schedules_byuser`, {
        user_id: 1,
        car,
        start_date: parsedPeriod.start.toISOString(),
        end_date: parsedPeriod.end.toISOString(),
      });

      await api.put(`/schedules_bycars/${car.id}`, formData);

      navigate("Confirmation", {
        title: "Carro alugado!",
        message:
          "Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.",
        nextScreen: {
          name: "Confirmation",
        },
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível alugar");
    } finally {
      setLoading(false);
    }
  }, [navigate, car, dates, parsedPeriod]);

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

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{formattedPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue> {formattedPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              {`R$ ${car.rent.price} x${dates.total} ${
                dates.total > 1 ? "diárias" : "diária"
              }`}
            </RentalPriceQuota>
            <RentalPriceTotal>{`R$ ${
              car.rent.price * dates.total
            }`}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title={"Alugar agora"}
          disabled={loading}
          loading={loading}
          color={theme.colors.success}
          onPress={handleCreateRental}
        />
      </Footer>
    </Container>
  );
};
