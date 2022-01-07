import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { SchedulingComplete } from "../screens/SchedulingComplete";

import { CarDTO } from "../dtos/CarDTO";

export type StackRoutesParamList = {
  Home: undefined;
  CarDetails: {
    car: CarDTO;
  };
  Scheduling: {
    car: CarDTO;
  };
  SchedulingDetails: {
    car: CarDTO;
    period: {
      start: string;
      end: string;
    };
  };
  SchedulingComplete: undefined;
};

export const StackRoutes: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name={"Home"} component={Home} />
      <Screen name={"CarDetails"} component={CarDetails} />
      <Screen name={"Scheduling"} component={Scheduling} />
      <Screen name={"SchedulingDetails"} component={SchedulingDetails} />
      <Screen name={"SchedulingComplete"} component={SchedulingComplete} />
    </Navigator>
  );
};
