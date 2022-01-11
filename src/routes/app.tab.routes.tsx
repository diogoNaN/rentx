import React from "react";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { useTheme } from "styled-components";

import HomeSvg from "../assets/bottomTab/home.svg";
import ProfileSvg from "../assets/bottomTab/people.svg";
import CarSvg from "../assets/bottomTab/car.svg";

export type AppTabRoutesParamList = {
  Home: undefined;
  Profile: undefined;
  MyCars: undefined;
};

export type AppTabRoutesNavigationProps =
  BottomTabNavigationProp<AppTabRoutesParamList>;

const { Navigator, Screen } = createBottomTabNavigator<AppTabRoutesParamList>();

import { AppStackRoutes } from "./app.stack.routes";

import { Profile } from "../screens/Profile";
import { MyCars } from "../screens/MyCars";

export const AppTabRoutes: React.FC = () => {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary,
        },
      }}
    >
      <Screen
        name={"Home"}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeSvg fill={color} width={size} height={size} />
          ),
        }}
        component={AppStackRoutes}
      />

      <Screen
        name={"Profile"}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ProfileSvg fill={color} width={size} height={size} />
          ),
        }}
        component={Profile}
      />

      <Screen
        name={"MyCars"}
        options={{
          tabBarIcon: ({ color, size }) => (
            <CarSvg fill={color} width={size} height={size} />
          ),
        }}
        component={MyCars}
      />
    </Navigator>
  );
};
