import React from "react";
import { useTheme } from "styled-components";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacityProps } from "react-native";

import { Container } from "./styles";

type BackButtomProps = TouchableOpacityProps & {
  color?: string;
};

export const BackButton: React.FC<BackButtomProps> = (props) => {
  const theme = useTheme();

  const { color = theme.colors.text, ...rest } = props;

  return (
    <Container {...rest}>
      <MaterialIcons name="chevron-left" size={24} color={color} />
    </Container>
  );
};
