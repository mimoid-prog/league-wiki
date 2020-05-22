import React, { useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import lightTheme from "./themes/light";
import darkTheme from "./themes/dark";
import style from "./style";
import App from "./App";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0; 
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }

  [data-reach-dialog-overlay] {
    background: hsla(0, 0%, 0%, 0.5);
  }
`;

const Global: React.FC = () => {
  const stored = localStorage.getItem("league-wiki-theme");
  const [isDarkTheme, setIsDarkTheme] = useState(
    stored === "light" ? false : true,
  );

  const changeTheme = () => {
    const newTheme = !isDarkTheme ? "dark" : "light";
    localStorage.setItem("league-wiki-theme", newTheme);
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeProvider
      theme={{ theme: isDarkTheme ? darkTheme : lightTheme, style }}
    >
      <GlobalStyle />
      <App changeTheme={changeTheme} isDarkTheme={isDarkTheme} />
    </ThemeProvider>
  );
};

export default Global;
