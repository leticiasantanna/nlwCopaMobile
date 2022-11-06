import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useTheme } from "native-base";

import { PlusCircle, SoccerBall } from "phosphor-react-native";
import { Platform } from "react-native";
import { Find } from "../screen/Find";
import { New } from "../screen/New";
import { Pools } from "../screen/Pools";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { colors, sizes } = useTheme();

  const size = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "beside-icon",
        tabBarActiveTintColor: colors.purple[200],
        tabBarInactiveTintColor: colors.purple[400],
        tabBarStyle: {
          position: "absolute",
          height: sizes[22],
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },

        tabBarItemStyle: {
          position: "relative",
          top: Platform.OS === "android" ? -5 : 0,
        },
      }}
    >
      <Screen
        name="new"
        component={New}
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />,
          tabBarLabel: "Criar Bolão",
        }}
      />

      <Screen
        name="pools"
        component={Pools}
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />,
          tabBarLabel: "Meus Bolões",
        }}
      />

      <Screen
        name="find"
        component={Find}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}
