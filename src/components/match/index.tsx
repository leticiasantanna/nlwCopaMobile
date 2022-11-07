import { Button, HStack, Text, useTheme, VStack } from "native-base";
import { X, Check } from "phosphor-react-native";
import { getName } from "country-list";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";

import { Team } from "../team";
import { IProps } from "./types";

export function Match(props: IProps) {
  const { colors, sizes } = useTheme();

  const when = dayjs(props.data.date)
    .locale(ptBr)
    .format("DD [de] MMMM [de] YYYY [ás] HH:00[h]");

  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
    >
      <Text color="purple.200" fontFamily="heading" fontSize="sm">
        {getName(props.data.firstTeamCountryCode)} {"vs "}
        {getName(props.data.secondTeamCountryCode)}
      </Text>

      <Text color="purple.100" fontSize="xs">
        {when}
      </Text>

      <HStack
        mt={4}
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <Team
          code={props.data.firstTeamCountryCode}
          position="right"
          onChangeText={props.setFirstTeamPoints}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          code={props.data.secondTeamCountryCode}
          position="left"
          onChangeText={props.setSecondTeamPoints}
        />
      </HStack>

      {!props.data.guess && (
        <Button
          size="xs"
          w="full"
          bgColor="green.500"
          mt={4}
          onPress={props.onGuessConfirm}
        >
          <HStack alignItems="center">
            <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
              CONFIRMAR PALPITE
            </Text>

            <Check color={colors.white} size={sizes[4]} />
          </HStack>
        </Button>
      )}
    </VStack>
  );
}
