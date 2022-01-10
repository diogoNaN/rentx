import React from "react";
import { useTheme } from "styled-components";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";

import { Container, Title } from "./styles";

type ButtomProps = TouchableOpacityProps & {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
};

export const Button: React.FC<ButtomProps> = (props) => {
  const theme = useTheme();

  const {
    title,
    color = theme.colors.main,
    disabled = false,
    loading = false,
    light = false,
    ...rest
  } = props;

  return (
    <Container
      {...rest}
      color={color}
      disabled={disabled}
      style={{
        opacity: !disabled && !loading ? 1 : 0.5,
      }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
};
