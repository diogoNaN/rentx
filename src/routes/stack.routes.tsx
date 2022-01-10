import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { Confirmation } from "../screens/Confirmation";
import { MyCars } from "../screens/MyCars";
import { SignIn } from "../screens/SignIn";
import { SignUpFirstStep } from "../screens/SignUp/SignUpFirstStep";
import { SignUpSecondStep } from "../screens/SignUp/SignUpSecondStep";
import { Splash } from "../screens/Splash";

import { CarDTO } from "../dtos/CarDTO";

type StackRoutes = keyof StackRoutesParamList;

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
  Confirmation: {
    title: string;
    message: string;
    nextScreen: {
      name: StackRoutes;
      params?: any;
    };
  };
  MyCars: undefined;
  Splash: undefined;

  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: {
    user: {
      name: string;
      email: string;
      driver_license: string;
    };
  };
};

export const StackRoutes: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SignIn"
    >
      <Screen
        name={"Home"}
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      />
      <Screen name={"CarDetails"} component={CarDetails} />
      <Screen name={"Scheduling"} component={Scheduling} />
      <Screen name={"SchedulingDetails"} component={SchedulingDetails} />
      <Screen name={"Confirmation"} component={Confirmation} />
      <Screen name={"MyCars"} component={MyCars} />
      <Screen name={"Splash"} component={Splash} />
      <Screen name={"SignIn"} component={SignIn} />
      <Screen name={"SignUpFirstStep"} component={SignUpFirstStep} />
      <Screen name={"SignUpSecondStep"} component={SignUpSecondStep} />
    </Navigator>
  );
};
