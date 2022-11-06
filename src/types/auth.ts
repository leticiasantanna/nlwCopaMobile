import { ReactNode } from "react";

export interface IUserProps {
  name: string;
  avatarUrl?: string;
}

export interface IAuthContextProps {
  user: IUserProps;
  isUserLogged: boolean;
  signIn: () => Promise<void>;
}

export interface IAuthProviderProps {
  children: ReactNode;
}
