import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import { api } from "../services/api";

type User = {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
};

type AuthState = {
  token: string;
  user: User;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: User;
  loaded: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  splashDone: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<AuthState>({} as AuthState);

  const signIn = useCallback(
    async (data: SignInCredentials) => {
      const { email, password } = data;

      const response = await api.post("/sessions", {
        email,
        password,
      });

      const { user, token } = response.data;

      // api.defaults.headers["authorization"] = `Bearer ${token}`;

      setData({
        token,
        user,
      });
    },
    [api]
  );

  const splashDone = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loaded,
        user: data.user,
        signIn,
        splashDone,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
