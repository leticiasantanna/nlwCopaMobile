import { Center, Text, Icon } from "native-base";
import { useAuth } from "../hooks/useAuth";

import { Fontisto } from "@expo/vector-icons";
import Logo from "../assets/logo.svg";
import Button from "../components/button";

export function SignIn() {
  const { signIn, isUserLogged } = useAuth();
  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />

      <Button
        type="PRIMARY"
        title="LOGIN COM"
        rightIcon={<Icon as={Fontisto} name="google" color="white" size="sm" />}
        mt={12}
        onPress={signIn}
        isLoading={isUserLogged}
        _loading={{ _spinner: { color: "white" } }}
      />

      <Text color="white" textAlign="center" mt={4}>
        Utilizamos apenas sua informação de e-mail para criar a conta
      </Text>
    </Center>
  );
}
