import { Heading, Text, VStack } from "native-base";
import { Header } from "../components/header";

import Logo from "../assets/logo.svg";
import { Input } from "../components/input";
import Button from "../components/button";

export function New() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar bolão novo" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Compartilhe seu bolão da copa entre amigos!
        </Heading>

        <Input marginBottom={2} placeholder="Dê um nome ao seu bolão" />

        <Button title="CRIAR MEU BOLÃO" marginBottom={5} />

        <Text color="gray.200" fontSize="sm" textAlign="center">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
