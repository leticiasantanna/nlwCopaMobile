import { Button as ButtonNativeBase, Text } from "native-base";
import { IButtonAppProps } from "./types";

function Button({ title, type = "PRIMARY", ...rest }: IButtonAppProps) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded="sm"
      textTransform="uppercase"
      bg={type === "SECONDARY" ? "purple.500" : "purple.900"}
      _pressed={{ bg: type === "SECONDARY" ? "purple.600" : "purple.200" }}
      _loading={{
        _spinner: { color: "white" },
      }}
      {...rest}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        color={type === "SECONDARY" ? "white" : "black"}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}

export default Button;
