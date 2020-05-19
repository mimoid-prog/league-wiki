import React, { FC, useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Content from "./components/Content";
import Champions from "./pages/Champions";
import Items from "./pages/Items";
import Spells from "./pages/Spells";
import Icons from "./pages/Icons";

import lightTheme from "./themes/light";
import darkTheme from "./themes/dark";
import style from "./style";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  width: 100vw;
`;

const App: FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  return (
    <ThemeProvider
      theme={{ theme: isDarkTheme ? darkTheme : lightTheme, style }}
    >
      <GlobalStyle />
      <AppWrapper>
        <Navbar setIsDarkTheme={setIsDarkTheme} isDarkTheme={isDarkTheme} />
        <Content>
          <Switch>
            <Route exact path="/">
              <Champions />
            </Route>
            <Route path="/items">
              <Items />
            </Route>
            <Route path="/spells">
              <Spells />
            </Route>
            <Route path="/icons">
              <Icons />
            </Route>
          </Switch>
        </Content>
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
