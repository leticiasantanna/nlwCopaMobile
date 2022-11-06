import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    gray: {
      950: "#09090A",
      900: "#121214",
      800: "#202024",
      600: "#323238",
      300: "#8D8D99",
      200: "#C4C4CC",
    },
    purple: {
      200: "#CF9FFF",
      400: "#51518b",
      300: "#A95C68",
      500: "#702963",
      900: "#301934	",
    },
    green: {
      500: "#047C3F",
    },
    yellow: {
      500: "#F7DD43",
      600: "#BBA317",
    },
    red: {
      500: "#DB4437",
    },
    white: "#FFFFFF",
  },
  fonts: {
    heading: "Ubuntu_700Bold",
    body: "Ubuntu_400Regular",
    medium: "Ubuntu_500Medium",
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  sizes: {
    14: 56,
    22: 80,
    26: 87,
  },
});
