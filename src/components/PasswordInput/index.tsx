import React, { useCallback, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import {
  Container,
  IconContainer,
  InputText,
  VisibilityButton,
} from "./styles";
import { TextInputProps } from "react-native";

type InputProps = TextInputProps & {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
};

export const PasswordInput: React.FC<InputProps> = (props) => {
  const theme = useTheme();

  const [visible, setVisible] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const { iconName, value, ...rest } = props;

  const onFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!value);
  }, [value]);

  const handleChangeVisibility = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

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
      <InputText
        autoCorrect={false}
        secureTextEntry={!visible}
        onFocus={onFocus}
        onBlur={onBlur}
        {...rest}
      />
      <VisibilityButton onPress={handleChangeVisibility}>
        <IconContainer>
          <Feather
            name={visible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </VisibilityButton>
    </Container>
  );
};
