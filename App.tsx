import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from "@expo-google-fonts/archivo";

import theme from "./src/styles/theme";

import { Home } from "./src/screens/Home";
import { CarDetails } from "./src/screens/CarDetails";

export default function App() {
  const [isFontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  if (!isFontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        animated
        translucent
        barStyle={"light-content"}
        backgroundColor={"transparent"}
      />
      {/* <Home /> */}
      <CarDetails />
    </ThemeProvider>
  );
}
