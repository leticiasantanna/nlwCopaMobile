import { Box, useToast, FlatList } from "native-base";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import { EmptyMyPoolList } from "../emptyMyPoolList";
import { Loading } from "../loading";
import { Match } from "../match";
import { IMatchProps } from "../match/types";
import { IGuessesProps } from "./types";

export function Guesses(props: IGuessesProps) {
  const [matchs, setMatchs] = useState<IMatchProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState("");
  const [secondTeamPoints, setSecondTeamPoints] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  async function getMatchs() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${props.poolId}/matchs`);
      setMatchs(response.data.matchs);
    } catch (error) {
      console.log("error busca partida", error);

      toast.show({
        title: "Houve um erro ao carregar os jogos",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleConfirmGuess(matchId: string) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        toast.show({
          title: "Informe um placar",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post(`/pools/${props.poolId}/matchs/${matchId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      toast.show({
        title: "Palpite cadastrado com sucesso",
        placement: "top",
        bgColor: "green.500",
      });
      getMatchs();
    } catch (error) {
    } finally {
    }
  }

  useEffect(() => {
    getMatchs();
  }, [props]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FlatList
      data={matchs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Match
          data={item}
          onGuessConfirm={() => handleConfirmGuess(item.id)}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
        />
      )}
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={() => <EmptyMyPoolList code={props.code} />}
    />
  );
}
