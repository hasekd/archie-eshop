import { extendTheme } from "@chakra-ui/react";

const color = {
  primary: {
    white: "#ffffff",
    black: "#000000",
    yellow: "#FFD500",
    red: "#DD3639",
    lightBlue: "#7AABC8",
  },
  secondary: {
    danger: "#dc3545",
    warnimg: "#ffc107",
    success: "#198754",
  },
  text: {
    white: "#ffffff",
    black: "#000000",
  },
};

const shadow = {
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
};

export const theme = {
  color,
  shadow,
};

export type Theme = typeof theme;

const globalStylesTheme = {
  styles: {
    global: {
      body: { bg: "#eee", boxSizing: "border-box", margin: 0, padding: 0 },
      html: { fontSize: "62.5%" },
    },
  },
};

const chakraTheme = extendTheme({
  ...globalStylesTheme,
});

export default chakraTheme;
