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

import {
  AppStackRoutesParamList,
  AppStackRoutesNavigationProps,
} from "../../routes/app.stack.routes";

type Params = AppStackRoutesParamList["SchedulingDetails"];

export const SchedulingDetails: React.FC = () => {
  const route = useRoute();
  const { navigate, goBack } = useNavigation<AppStackRoutesNavigationProps>();

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

  const rentTotal = useMemo(() => {
    return dates.total * car.price;
  }, [dates]);

  const handleCreateRental = useCallback(async () => {
    setLoading(true);

    try {
      await api.post(`/rentals`, {
        user_id: 1,
        car_id: car.id,
        start_date: parsedPeriod.start.toISOString(),
        end_date: parsedPeriod.end.toISOString(),
        total: rentTotal,
      });

      navigate("Confirmation", {
        title: "Carro alugado!",
        message:
          "Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.",
        button: {
          onPress: () => navigate("Home"),
        },
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível alugar");
    } finally {
      setLoading(false);
    }
  }, [navigate, car, parsedPeriod, rentTotal]);

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
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
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
              {`R$ ${car.price} x${dates.total} ${
                dates.total > 1 ? "diárias" : "diária"
              }`}
            </RentalPriceQuota>
            <RentalPriceTotal>{`R$ ${rentTotal}`}</RentalPriceTotal>
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
