import { eachDayOfInterval, format } from "date-fns";

import theme from "../../styles/theme";
import { DayProps, MarkedDateProps } from ".";

export const generateInterval = (start: DayProps, end: DayProps) => {
  let interval: MarkedDateProps = {};

  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp),
  }).forEach((day) => {
    const date = format(day, "yyyy-MM-dd");

    interval = {
      ...interval,
      [date]: {
        color:
          start.dateString === date || end.dateString === date
            ? theme.colors.main
            : theme.colors.main_light,
        textColor:
          start.dateString === date || end.dateString === date
            ? theme.colors.main_light
            : theme.colors.main,
      },
    };
  });

  return interval;
};
