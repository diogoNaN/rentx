import React, { useCallback, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { Container, IconContainer, InputText } from "./styles";
import { TextInputProps } from "react-native";

type InputProps = TextInputProps & {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
};

export const Input: React.FC<InputProps> = (props) => {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { iconName, value, ...rest } = props;

  const onFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!value);
  }, [value]);

  return (
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>
      <InputText onFocus={onFocus} onBlur={onBlur} {...rest} />
    </Container>
  );
};
