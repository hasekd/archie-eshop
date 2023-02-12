import { defineStyle, defineStyleConfig, extendTheme } from "@chakra-ui/react";

const color = {
  primary: {
    white: "#ffffff",
    black: "#000000",
    blue: "#0c8599",
    gray: "#f9f9f9",
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
  hover: {
    blue: "#2491a3",
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
      body: {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
        fontFamily: "'Raleway', sans-serif",
      },
      html: { fontSize: "62.5%" },
    },
  },
};

const customButton = defineStyleConfig({
  variants: {
    custom: () => ({ _active: { bgColor: "none" } }),
  },
});

const chakraTheme = extendTheme({
  ...globalStylesTheme,
  components: { Button: customButton },
});

export default chakraTheme;
