import { Heading, VStack } from "native-base";
import { Header } from "../components/header";

import { Input } from "../components/input";
import Button from "../components/button";

export function Find() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Encontre um bolão através de seu código único
        </Heading>

        <Input marginBottom={2} placeholder="Digite o código do bolão" />

        <Button title="BUSCAR BOLÃO" marginBottom={5} type="SECONDARY" />
      </VStack>
    </VStack>
  );
}
