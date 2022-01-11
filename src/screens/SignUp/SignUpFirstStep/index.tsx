import React, { useCallback, useState } from "react";
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
  Steps,
  Title,
  SubTitle,
  Form,
  FormSpacement,
  Footer,
  FormTitle,
} from "./styles";

import { AuthRoutesNavigationProps } from "../../../routes/auth.routes";

import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";

export const SignUpFirstStep: React.FC = () => {
  const { goBack, navigate } = useNavigation<AuthRoutesNavigationProps>();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicense, setDriverLicense] = useState("");

  const handlePressNext = useCallback(async () => {
    const schema = Yup.object().shape({
      name: Yup.string().required("Nome obrigatório"),
      email: Yup.string()
        .email("E-mail inválido")
        .required("E-mail obrigatório"),
      driver_license: Yup.string().required("CNH obrigatório"),
    });

    try {
      setLoading(true);
      const formData = {
        name,
        email,
        driver_license: driverLicense,
      };
      await schema.validate(formData, { abortEarly: false });

      navigate("SignUpSecondStep", { user: formData });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        let message = "";

        error.errors.map((err) => (message += err + "\n"));

        return Alert.alert("Ops", message);
      }

      console.log(error);
      Alert.alert("Ops", "Não foi possível entrar");
    } finally {
      setLoading(false);
    }
  }, [name, email, driverLicense]);

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar barStyle={"dark-content"} />
          <Header>
            <BackButton onPress={goBack} />

            <Steps>
              <Bullet active />
              <Bullet />
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
            <FormTitle>1. Dados</FormTitle>

            <Input
              iconName="user"
              placeholder="Nome"
              value={name}
              onChangeText={setName}
            />

            <FormSpacement />

            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <FormSpacement />

            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              value={driverLicense}
              onChangeText={setDriverLicense}
            />
          </Form>

          <Footer>
            <Button
              title={"Próximo"}
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
