import React, { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Yup from "yup";

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionName,
  Section,
} from "./styles";

import { useAuth } from "../../hooks/auth";

import { BackButton } from "../../components/BackButton";
import { Input } from "../../components/Input";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { PasswordInput } from "../../components/PasswordInput";
import { Button } from "../../components/Button";

export const Profile: React.FC = () => {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { user, signOut, userUpdate } = useAuth();

  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const handleAvatarSelect = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  }, []);

  const handleUserUpdate = useCallback(async () => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Nome é obrigatório"),
        driver_license: Yup.string().required("CNH é obrigatória"),
      });

      await schema.validate({
        name,
        driver_license: driverLicense,
      });

      await userUpdate({
        name,
        driver_license: driverLicense,
        avatar,
      });

      Alert.alert("Sucesso", "Dados atualizados");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        let message = "";

        error.errors.map((err) => (message += err + "\n"));

        return Alert.alert("Ops", message);
      }

      console.log(error);
      Alert.alert("Ops", "Não foi possível atualizar");
    }
  }, [name, driverLicense, avatar]);

  const handleSignOut = useCallback(() => {
    Alert.alert(
      "Confirmar",
      "Lembre-se, ao sair, será necessário conexão com a internet para efetuar login novamente",
      [
        {
          text: "Cancelar",
        },
        {
          text: "Sair",
          onPress: () => signOut(),
        },
      ]
    );
  }, [signOut]);

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={goBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              {!!avatar && <Photo source={{ uri: avatar }} />}
              <PhotoButton onPress={handleAvatarSelect}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === "dataEdit"}
                onPress={() => setOption("dataEdit")}
              >
                <OptionName active={option === "dataEdit"}>Dados</OptionName>
              </Option>
              <Option
                active={option === "passwordEdit"}
                onPress={() => setOption("passwordEdit")}
              >
                <OptionName active={option === "passwordEdit"}>
                  Trocar senha
                </OptionName>
              </Option>
            </Options>
            {option === "dataEdit" ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section>
            ) : (
              <Section>
                <PasswordInput iconName="lock" placeholder="Senha atual" />
                <PasswordInput iconName="lock" placeholder="Nova senha" />
                <PasswordInput iconName="lock" placeholder="Confirmar senha" />
              </Section>
            )}

            <Button title="Salvar alterações" onPress={handleUserUpdate} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
