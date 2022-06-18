import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { CacheProvider, Global } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import * as theme from "@antiraids/theme";
import reportWebVitals from "./reportWebVitals";

(() => {
  const cache = theme.cache();
  return ReactDOM.render(
    <React.StrictMode>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme.theme}>
          <CssBaseline />
          <Global styles={theme.global} />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </CacheProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
