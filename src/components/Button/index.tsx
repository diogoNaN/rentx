import React from "react";
import { useTheme } from "styled-components";
import { TouchableOpacityProps } from "react-native";

import { Container, Title } from "./styles";

type ButtomProps = TouchableOpacityProps & {
  title: string;
  color?: string;
};

export const Button: React.FC<ButtomProps> = (props) => {
  const theme = useTheme();

  const { title, color = theme.colors.main, ...rest } = props;

  return (
    <Container {...rest} color={color}>
      <Title>{title}</Title>
    </Container>
  );
};
