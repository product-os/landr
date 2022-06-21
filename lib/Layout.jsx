import React from "react";
import { Provider } from "rendition";

import defaultTheme from "../default-theme.json";

import "@fortawesome/fontawesome/styles.css";
import "./components/global.css";
import "react-typist/dist/Typist.css";

const landrTheme = process.env.LANDR_THEME
  ? JSON.parse(process.env.LANDR_THEME)
  : defaultTheme;

export const theme = {
  button: {
    font: {
      weight: "normal",
    },
  },
  colors: {
    primary: {
      main: landrTheme.vibrant.normal.color,
      light: landrTheme.vibrant.light.color,
      dark: landrTheme.vibrant.dark.color,
    },
    text: {
      main: "#2a506f",
      light: "#2a506f",
      dark: "#2a506f",
    },
  },
  breakpoints: [576, 768, 992, 1268],
  global: {
    font: {
      family: "Source Sans Pro",
    },
  },
  fontSizes: [12, 16, 18, 20, 24, 34, 48, 62, 74, 96],
  space: [0, 4, 8, 16, 36, 46, 80],
};

const Layout = ({ children }) => {
  return <Provider theme={theme}>{children}</Provider>;
};

export default Layout;
