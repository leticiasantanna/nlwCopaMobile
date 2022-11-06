import { Heading, Text, VStack, useToast } from "native-base";
import { Header } from "../components/header";

import Logo from "../assets/logo.svg";
import { Input } from "../components/input";
import Button from "../components/button";
import { useState } from "react";
import { api } from "../service/api";

export function New() {
  const [pollName, setPollName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  async function handleCreateNewPool() {
    if (!pollName.trim()) {
      return toast.show({
        title: "O nome do bolão é obrigatório!",
        placement: "top",
        bgColor: "red.500",
      });
    }

    try {
      setIsLoading(true);
      await api.post("/pools", { title: pollName });

      toast.show({
        title: "Bolão criado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Houve um erro ao criar o bolão, tente novamente!",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

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

        <Input
          marginBottom={2}
          placeholder="Dê um nome ao seu bolão"
          onChangeText={setPollName}
          value={pollName}
        />

        <Button
          title="CRIAR MEU BOLÃO"
          marginBottom={5}
          type="SECONDARY"
          onPress={handleCreateNewPool}
          isLoading={isLoading}
        />

        <Text color="gray.200" fontSize="sm" textAlign="center">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
