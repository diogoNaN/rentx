import React, { useCallback, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";
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
  Steps,
  Title,
  SubTitle,
  Form,
  FormSpacement,
  Footer,
  FormTitle,
} from "./styles";

import { api } from "../../../services/api";

import {
  AuthRoutesParamList,
  AuthRoutesNavigationProps,
} from "../../../routes/auth.routes";

import { Button } from "../../../components/Button";
import { Bullet } from "../../../components/Bullet";
import { BackButton } from "../../../components/BackButton";
import { PasswordInput } from "../../../components/PasswordInput";

type Params = AuthRoutesParamList["SignUpSecondStep"];

export const SignUpSecondStep: React.FC = () => {
  const theme = useTheme();
  const { goBack, navigate } = useNavigation<AuthRoutesNavigationProps>();
  const route = useRoute();

  const {
    user: { name, email, driver_license },
  } = route.params as Params;

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handlePressNext = useCallback(async () => {
    const schema = Yup.object().shape({
      password_confirm: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "As senhas são diferentes"
      ),
      password: Yup.string()
        .required("Senha obrigatória")
        .min(6, "Senha menor que 6 dígitos"),
    });

    try {
      setLoading(true);
      const data = {
        password,
        password_confirm: passwordConfirm,
        name,
        email,
        driver_license,
      };

      await schema.validate(data, { abortEarly: false });

      await api.post("/users", {
        name,
        email,
        password,
        driver_license,
      });

      navigate("Confirmation", {
        title: "Conta criada!",
        message: "Agora é so fazer login\ne aproveitar",
        button: {
          onPress: () => navigate("SignIn"),
        },
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        let message = "";

        error.errors.map((err) => (message += err + "\n"));

        return Alert.alert("Ops", message);
      }

      console.log(error);
      Alert.alert("Ops", "Não foi possível cadastrar");
    } finally {
      setLoading(false);
    }
  }, [password, passwordConfirm]);

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar barStyle={"dark-content"} />
          <Header>
            <BackButton onPress={goBack} />

            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          <Title>
            Crie sua{"\n"}
            conta
          </Title>

          <SubTitle>
            Faça seu cadastro de{"\n"}
            forma rápida e facil.
          </SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />

            <FormSpacement />

            <PasswordInput
              iconName="lock"
              placeholder="Confirmar senha"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
            />
          </Form>

          <Footer>
            <Button
              title={"Cadastrar"}
              color={theme.colors.success}
              onPress={handlePressNext}
              disabled={loading}
              loading={loading}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
