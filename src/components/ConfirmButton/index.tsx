import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Title } from "./styles";

type ConfirmButtomProps = TouchableOpacityProps & {
  title: string;
};

export const ConfirmButton: React.FC<ConfirmButtomProps> = (props) => {
  const { title, ...rest } = props;

  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
};
