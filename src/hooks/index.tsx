import React, { ReactNode } from "react";

import { AuthProvider } from "./auth";

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
