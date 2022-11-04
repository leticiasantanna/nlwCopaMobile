import { createContext } from "react";
import { IAuthContextProps, IAuthProviderProps } from "../@types/auth";

export const AuthContext = createContext({} as IAuthContextProps);

export function AuthContextProvider({ children }: IAuthProviderProps) {
  async function signIn() {}
  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: {
          name: "Letícia",
          avatarUrl: "hhtp://github.com/leticiasantanna.png",
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
