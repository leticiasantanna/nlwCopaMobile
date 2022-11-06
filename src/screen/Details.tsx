import { HStack, useToast, VStack } from "native-base";
import { Share } from "react-native";
import { useRoute } from "@react-navigation/native";
import { api } from "../service/api";
import { useEffect, useState } from "react";

import { IRouteParams } from "../types/detailsPage";

import { Header } from "../components/header";
import { Loading } from "../components/loading";
import { PollCardProps } from "../components/poolCard";
import { PoolHeader } from "../components/poolHeader";
import { EmptyMyPoolList } from "../components/emptyMyPoolList";
import { Option } from "../components/option";
import { Guesses } from "../components/guesses";

export function Details() {
  const [pollDetails, setPollDetails] = useState<PollCardProps>(
    {} as PollCardProps
  );
  const [optionClicked, setOptionClicked] = useState<"guesses" | "ranking">(
    "guesses"
  );
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const toast = useToast();

  const { id } = route.params as IRouteParams;

  async function getPollDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/pools/${id}`);
      setPollDetails(response.data.poll);
    } catch (error) {
      console.log("erro aquim", error);

      toast.show({
        title: "Houve um erro ao carregar detalhes do bolão",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleShareCode() {
    await Share.share({
      message: pollDetails.code,
    });
  }

  useEffect(() => {
    getPollDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={pollDetails.title}
        showBackButton
        showShareButton
        onShare={handleShareCode}
      />

      <>
        {pollDetails._count?.participants > 0 ? (
          <VStack>
            <PoolHeader data={pollDetails} />
            <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
              <Option
                title="Seus palpites"
                isSelected={optionClicked === "guesses"}
                onPress={() => setOptionClicked("guesses")}
              />
              <Option
                title="Ranking do Grupo"
                isSelected={optionClicked === "ranking"}
                onPress={() => setOptionClicked("ranking")}
              />
            </HStack>
            <Guesses poolId={pollDetails.id} />
          </VStack>
        ) : (
          <EmptyMyPoolList code={pollDetails.code} />
        )}
      </>
    </VStack>
  );
}
