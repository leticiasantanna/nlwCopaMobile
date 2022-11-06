import { Box, useToast } from "native-base";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import { IGuessesProps } from "./types";

export function Guesses(props: IGuessesProps) {
  const [matchs, setMatchs] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  async function getMatchs() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${props.poolId}/matchs`);
      console.log(response.data.matchs);
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Houve um erro ao carregar os jogos",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getMatchs();
  }, [props]);

  return <Box></Box>;
}
