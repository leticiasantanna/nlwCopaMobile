import { Heading, useToast, VStack } from "native-base";
import { api } from "../service/api";

import { Header } from "../components/header";
import { Input } from "../components/input";
import Button from "../components/button";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [pollCode, setPollCode] = useState("");

  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPoll() {
    try {
      setIsLoading(true);
      if (!pollCode.trim()) {
        return toast.show({
          title: "Você não informou o código",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post("/pools/join", { code: pollCode });
      toast.show({
        title: "Você agora está nesse bolão",
        placement: "top",
        bgColor: "green.500",
      });
      navigate("pools");
    } catch (error) {
      console.log(error);
      setIsLoading(false);

      if (error.response?.data?.message === "Poll not found") {
        return toast.show({
          title: "Bolão não encontrado",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (error.response?.data?.message === "You already in this poll") {
        return toast.show({
          title: "Você já participa desse bolão",
          placement: "top",
          bgColor: "red.500",
        });
      }

      toast.show({
        title: "Houve erro ao buscar bolão",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }
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

        <Input
          marginBottom={2}
          placeholder="Digite o código do bolão"
          autoCapitalize="characters"
          onChangeText={setPollCode}
        />

        <Button
          title="BUSCAR BOLÃO"
          marginBottom={5}
          type="SECONDARY"
          isLoading={isLoading}
          onPress={handleJoinPoll}
        />
      </VStack>
    </VStack>
  );
}
