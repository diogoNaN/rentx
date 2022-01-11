import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

export type AuthRoutesParamList = {
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: {
    user: {
      name: string;
      email: string;
      driver_license: string;
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
};

export type AuthRoutesNavigationProps =
  NativeStackNavigationProp<AuthRoutesParamList>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesParamList>();

import { SignIn } from "../screens/SignIn";
import { SignUpFirstStep } from "../screens/SignUp/SignUpFirstStep";
import { SignUpSecondStep } from "../screens/SignUp/SignUpSecondStep";
import { Confirmation } from "../screens/Confirmation";

export const AuthRoutes: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SignIn"
    >
      <Screen name={"SignIn"} component={SignIn} />
      <Screen name={"SignUpFirstStep"} component={SignUpFirstStep} />
      <Screen name={"SignUpSecondStep"} component={SignUpSecondStep} />
      <Screen name={"Confirmation"} component={Confirmation} />
    </Navigator>
  );
};
