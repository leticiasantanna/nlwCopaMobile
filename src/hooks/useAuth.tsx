import { useContext } from "react";
import { IAuthContextProps } from "../@types/auth";

import { AuthContext } from "../contexts/AuthContext";

export function useAuth(): IAuthContextProps {
  const context = useContext(AuthContext);

  return context;
}
