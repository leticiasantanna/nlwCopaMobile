import { createContext, useEffect, useState } from "react";

import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import {
  IAuthContextProps,
  IAuthProviderProps,
  IUserProps,
} from "../@types/auth";

WebBrowser.maybeCompleteAuthSession();

export const AuthContext = createContext({} as IAuthContextProps);

export function AuthContextProvider({ children }: IAuthProviderProps) {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [user, setUser] = useState<IUserProps>({} as IUserProps);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "828981117456-vfphj3fjeo2012a5a8af8ao9agq2m6d6.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["profile", "email"],
  });

  async function signIn() {
    try {
      setIsUserLogged(true);
      await promptAsync();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLogged(false);
    }
  }

  async function loginWithGoogle(access_token: string) {
    console.log("TOKEN DE AUTENTICÇÃO", access_token);
  }

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      loginWithGoogle(response.authentication.accessToken);
    }
  }, [response]);
  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLogged,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
