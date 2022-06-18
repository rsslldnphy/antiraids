import { createTheme } from "@mui/material";
import { css } from "@emotion/react";
import createCache from "@emotion/cache";

export const theme = createTheme({
  typography: {
    h1: {
      fontSize: 48,
      textTransform: "uppercase",
      fontWeight: "bold",
    },
    h2: {
      fontSize: 34,
      fontWeight: "bold",
    },
    h3: {
      fontSize: 24,
      fontWeight: "bold",
      fontStyle: "italic",
    },
    h4: {
      fontSize: 24,
      fontWeight: "bold",
    },
    h5: {
      fontSize: 20,
      fontWeight: "bold",
    },
    h6: {
      fontSize: 20,
      fontWeight: "bold",
    },
    subtitle1: {
      fontSize: 16,
      lineHeight: "24px",
      fontWeight: "bold",
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: "bold",
    },
    body1: {
      fontSize: 16,
    },
    body2: {
      lineHeight: "24px",
      fontSize: 14,
    },
    button: {
      fontSize: 16,
      fontWeight: "bold",
      textTransform: "none",
    },
    caption: {
      fontSize: 12,
    },
    overline: {
      fontSize: 10,
      textTransform: "uppercase",
    },
  },
});

export const cache = () => createCache({ key: "css" });

export const global = css`
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }
`;
