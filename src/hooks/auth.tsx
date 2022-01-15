import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { api } from "../services/api";
import { database } from "../database";
import { User as ModelUser } from "../database/models/User";

type User = {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
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
  const [user, setUser] = useState<User>({} as User);

  const signIn = useCallback(
    async (data: SignInCredentials) => {
      try {
        const { email, password } = data;

        const response = await api.post("/sessions", {
          email,
          password,
        });

        const { user, token } = response.data;

        api.defaults.headers.common["authorization"] = `Bearer ${token}`;

        const userCollection = database.get<ModelUser>("users");
        await database.write(async () => {
          await userCollection.create((newUser) => {
            (newUser.user_id = user.id),
              (newUser.name = user.name),
              (newUser.email = user.email),
              (newUser.driver_license = user.driver_license),
              (newUser.avatar = user.avatar),
              (newUser.token = user.token);
          });
        });

        setUser({
          ...user,
          token,
        });
      } catch (error) {
        throw new Error(error as any);
      }
    },
    [api]
  );

  const splashDone = useCallback(() => {
    setLoaded(true);
  }, []);

  const loadUser = useCallback(async () => {
    const userCollection = database.get<ModelUser>("users");
    const response = await userCollection.query().fetch();

    if (response.length > 0) {
      const userData = response[0];
      api.defaults.headers.common["authorization"] = `Bearer ${userData.token}`;
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loaded,
        user,
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
