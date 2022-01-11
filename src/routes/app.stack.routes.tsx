import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

const { Navigator, Screen } =
  createNativeStackNavigator<AppStackRoutesParamList>();

import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { Confirmation } from "../screens/Confirmation";

import { CarDTO } from "../dtos/CarDTO";

export type AppStackRoutesParamList = {
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
  Confirmation: {
    title: string;
    message: string;
    button: {
      text?: string;
      onPress: () => void;
    };
  };
  MyCars: undefined;
};

export type AppStackRoutesNavigationProps =
  NativeStackNavigationProp<AppStackRoutesParamList>;

export const AppStackRoutes: React.FC = () => {
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
      <Screen name={"Confirmation"} component={Confirmation} />
    </Navigator>
  );
};
