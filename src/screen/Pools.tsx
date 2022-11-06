import { VStack, Icon, useToast, FlatList } from "native-base";
import { Octicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { api } from "../service/api";
import { useState, useCallback } from "react";

import { Header } from "../components/header";
import Button from "../components/button";
import { PollCardProps, PoolCard } from "../components/poolCard";
import { Loading } from "../components/loading";
import { EmptyPoolList } from "../components/emptyPoolList";

export function Pools() {
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [polls, setPolls] = useState<PollCardProps[]>([]);

  const toast = useToast();

  async function findPolls() {
    try {
      setIsLoading(true);
      const response = await api.get("/pools");
      setPolls(response.data);
    } catch (error) {
      toast.show({
        title: "Houve um erro ao buscar bolões, tente novamente!",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      findPolls();
    }, [])
  );

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus Bolões" />
      <VStack
        mt={8}
        mx={5}
        borderBottomWidth={2}
        borderBottomColor="gray.700"
        pb={4}
        mb={4}
      >
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          type="SECONDARY"
          marginBottom={2}
          rightIcon={
            <Icon as={Octicons} name="search" color="white" size="md" />
          }
          onPress={() => navigate("find")}
        />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={polls}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PoolCard
              data={item}
              onPress={() => navigate("details", { id: item.id })}
            />
          )}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => <EmptyPoolList />}
        />
      )}
    </VStack>
  );
}
