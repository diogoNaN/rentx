import React from "react";
import { useTheme } from "styled-components";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";

import { Container, Title } from "./styles";

type ButtomProps = TouchableOpacityProps & {
  title: string;
  color?: string;
  enabled?: boolean;
  loading?: boolean;
};

export const Button: React.FC<ButtomProps> = (props) => {
  const theme = useTheme();

  const {
    title,
    color = theme.colors.main,
    enabled = true,
    loading = false,
    ...rest
  } = props;

  return (
    <Container
      {...rest}
      color={color}
      disabled={!enabled}
      style={{
        opacity: enabled && !loading ? 1 : 0.5,
      }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title>{title}</Title>
      )}
    </Container>
  );
};
