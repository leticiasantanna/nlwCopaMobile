import { VStack, Icon } from "native-base";
import { Octicons } from "@expo/vector-icons";

import { Header } from "../components/header";
import Button from "../components/button";

export function Pools() {
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
          marginBottom={2}
          rightIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
        />
      </VStack>
    </VStack>
  );
}
