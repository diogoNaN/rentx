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
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
};

type UserUpdate = {
  name: string;
  driver_license: string;
  avatar: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: User;
  loaded: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  userUpdate: (userData: UserUpdate) => Promise<void>;
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

        const createdUser = await database.write(async () => {
          const createdUser = await userCollection.create((newUser) => {
            (newUser.user_id = user.id),
              (newUser.name = user.name),
              (newUser.email = user.email),
              (newUser.driver_license = user.driver_license),
              (newUser.avatar = user.avatar),
              (newUser.token = token);
          });

          return createdUser;
        });

        const userData: User = {
          id: createdUser.id,
          user_id: user.id,
          name: user.name,
          email: user.email,
          driver_license: user.driver_license,
          avatar: user.avatar,
          token: token,
        };

        setUser(userData);
      } catch (error) {
        throw new Error(error as any);
      }
    },
    [api]
  );

  const signOut = useCallback(async () => {
    try {
      const userCollection = database.get<ModelUser>("users");

      await database.write(async () => {
        const userSelected = await userCollection.find(user.id);

        await userSelected.destroyPermanently();
      });

      delete api.defaults.headers.common["authorization"];

      setUser({} as User);
    } catch (error) {
      throw new Error(error as any);
    }
  }, [user]);

  const userUpdate = useCallback(
    async (userData: UserUpdate) => {
      try {
        const userCollection = database.get<ModelUser>("users");

        await database.write(async () => {
          const userSelected = await userCollection.find(user.id);
          await userSelected.update((selectedUser) => {
            selectedUser.name = userData.name;
            selectedUser.driver_license = userData.driver_license;
            selectedUser.avatar = userData.avatar;
          });
        });

        setUser({
          ...user,
          name: userData.name,
          driver_license: userData.driver_license,
          avatar: userData.avatar,
        });
      } catch (error) {
        throw new Error(error as any);
      }
    },
    [user]
  );

  const splashDone = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        const userCollection = database.get<ModelUser>("users");
        const response = await userCollection.query().fetch();

        if (!isMounted) {
          return;
        }

        if (response.length > 0) {
          const userData = response[0];
          api.defaults.headers.common[
            "authorization"
          ] = `Bearer ${userData.token}`;

          const data: User = {
            id: userData.id,
            user_id: userData.user_id,
            name: userData.name,
            email: userData.email,
            driver_license: userData.driver_license,
            avatar: userData.avatar,
            token: userData.token,
          };

          setUser(data);
        }
      } catch (error) {
        console.log(error);
        throw new Error(error as any);
      }
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loaded,
        user,
        signIn,
        signOut,
        userUpdate,
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
