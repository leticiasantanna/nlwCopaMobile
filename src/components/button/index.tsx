import { Button as ButtonNativeBase, Text } from "native-base";
import { IButtonAppProps } from "./types";

function Button({ title, type = "PRIMARY", ...rest }: IButtonAppProps) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded="sm"
      textTransform="uppercase"
      bg={type === "SECONDARY" ? "purple.500" : "yellow.500"}
      _pressed={{ bg: type === "SECONDARY" ? "purple.600" : "yellow.600" }}
      _loading={{
        _spinner: { color: "black" },
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
