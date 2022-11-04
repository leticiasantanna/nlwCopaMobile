import { IButtonProps } from "native-base";

export interface IButtonAppProps extends IButtonProps {
  title: string;
  type?: "PRIMARY" | "SECONDARY";
}
