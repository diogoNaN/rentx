import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

type LoadProps = {};

export const Load: React.FC<LoadProps> = (props) => {
  const theme = useTheme();

  return (
    <ActivityIndicator
      color={theme.colors.main}
      size={"large"}
      style={{ flex: 1 }}
    />
  );
};
