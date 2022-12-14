import { createContext, useEffect, useState } from "react";

import { api } from "../service/api";

import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import {
  IAuthContextProps,
  IAuthProviderProps,
  IUserProps,
} from "../types/auth";

WebBrowser.maybeCompleteAuthSession();

export const AuthContext = createContext({} as IAuthContextProps);

export function AuthContextProvider({ children }: IAuthProviderProps) {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [user, setUser] = useState<IUserProps>({} as IUserProps);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.CLIENT_ID,
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
    try {
      setIsUserLogged(true);
      const tokenResponse = await api.post("/users", { access_token });

      console.log({ access_token });

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokenResponse.data.token}`;

      const userInfoResponse = await api.get("/me");
      setUser(userInfoResponse.data.user);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLogged(false);
    }
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
