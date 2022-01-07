import { CarDTO } from "./CarDTO";

export type ScheduleDTO = {
  id: string;
  user_id: string;
  car: CarDTO;
  start_date: string;
  end_date: string;
};
