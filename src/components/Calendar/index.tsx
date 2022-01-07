import React from "react";
import { Feather } from "@expo/vector-icons";
import {
  Calendar as CustomCalendar,
  LocaleConfig,
  DateData,
} from "react-native-calendars";
import { useTheme } from "styled-components";

import { ptBR } from "./localeConfig";
import { generateInterval } from "./generateInterval";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

type CalendarProps = {
  markedDates: MarkedDateProps;
  onDayPress: (date: DateData) => void;
};

type MarkedDateProps = {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disabledTouchEvent?: boolean;
  };
};

type DayProps = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

const Calendar: React.FC<CalendarProps> = (props) => {
  const theme = useTheme();

  const { markedDates, onDayPress } = props;

  return (
    <CustomCalendar
      firstDay={1}
      minDate={String(new Date())}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
      renderArrow={(direction) => (
        <Feather
          size={24}
          color={theme.colors.text}
          name={`chevron-${direction}`}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: theme.fonts.secondary_600,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
    />
  );
};

export { Calendar, MarkedDateProps, DayProps, generateInterval };
