import { createTheme } from "react-native-whirlwind";

export const light = createTheme({
  colors: {
    // Define your theme colors for light mode
    primary: "#7C5DFA",
    primaryLight: "#9277FF",
    paper: "#F8F8F8",
  },
});

export const dark = createTheme({
  colors: {
    // Define your theme colors for dark mode
    primary: "#7C5DFA",
    primaryLight: "#9277FF",
    paper: "#000",
  },
});

const t = createTheme({
  colors: {},
  fontFamilies: {
    sans: "Spartan-Medium",
    sansBold: "Spartan-Bold",
  },
});

export default t;
