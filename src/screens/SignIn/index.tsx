import React, { useCallback, useState } from "react";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import * as Yup from "yup";

import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  FormSpacement,
  Footer,
  FooterSpacement,
} from "./styles";

import { AuthRoutesNavigationProps } from "../../routes/auth.routes";

import { useAuth } from "../../hooks/auth";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";

export const SignIn: React.FC = () => {
  const theme = useTheme();
  const { signIn } = useAuth();
  const { navigate } = useNavigation<AuthRoutesNavigationProps>();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = useCallback(async () => {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email("E-mail inválido")
        .required("E-mail obrigatório"),
      password: Yup.string().required("Senha obrigatória"),
    });

    try {
      setLoading(true);
      await schema.validate({ email, password }, { abortEarly: false });

      await signIn({
        email,
        password,
      });
    } catch (error) {
      setLoading(false);

      if (error instanceof Yup.ValidationError) {
        let message = "";

        error.errors.map((err) => (message += err + "\n"));

        return Alert.alert("Ops", message);
      }

      console.log(error);
      Alert.alert("Ops", "Não foi possível entrar");
    }
  }, [email, password]);

  const handleSignUp = useCallback(async () => {
    navigate("SignUpFirstStep");
  }, [navigate]);

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar barStyle={"dark-content"} />
          <Header>
            <Title>
              Estamos{"\n"}
              quase lá.
            </Title>
            <SubTitle>
              Faça seu login para começar{"\n"}
              uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="E-mail"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <FormSpacement />

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
          </Form>

          <Footer>
            <Button
              title={"Login"}
              onPress={handleSignIn}
              disabled={loading}
              loading={loading}
            />

            <FooterSpacement />

            <Button
              title={"Criar conta"}
              color={theme.colors.background_secondary}
              light
              onPress={handleSignUp}
              disabled={false}
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
