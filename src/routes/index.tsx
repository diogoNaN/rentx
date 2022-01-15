import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../hooks/auth";

import { Splash } from "../screens/Splash";

import { AuthRoutes, AuthRoutesParamList } from "./auth.routes";
import { AppTabRoutes, AppTabRoutesParamList } from "./app.tab.routes";
import { AppStackRoutes, AppStackRoutesParamList } from "./app.stack.routes";

type AppRoutesParamList = AppTabRoutesParamList & AppStackRoutesParamList;

export type RootParamList = AppRoutesParamList | AuthRoutesParamList;

export const Routes: React.FC = () => {
  const { user, loaded } = useAuth();

  if (!loaded) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      {user.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
