import React, { FC, useState } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ThemeToggler from "./components/ThemeToggler";
import Champions from "./pages/Champions";
import Items from "./pages/Items";
import Spells from "./pages/Spells";
import Icons from "./pages/Icons";

const AppWrapper = styled.div`
  max-width: 100vw;

  ${(props) => props.theme.style.media.desktop} {
    display: grid;
    grid-template-columns: 250px 1fr;
  }
`;

const ContentWrapper = styled.div`
  padding: 30px 0 50px;
  background: rgb(${(props) => props.theme.theme.bg});
  color: ${(props) => props.theme.theme.color};

  ${(props) => props.theme.style.media.desktop} {
    grid-column: 2 / 3;
  }
`;

const Container = styled.div`
  max-width: 85%;
  margin: 0 auto;
`;

const ContentNavbar = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ThemeTogglerWrapper = styled.div`
  display: block;
  margin: 0 0 0 auto;

  ${(props) => props.theme.style.media.desktop} {
    display: none;
  }
`;

const MenuBtn = styled.button`
  background: none;
  border: 2px solid rgb(${(props) => props.theme.theme.reverse});
  text-transform: uppercase;
  font-weight: 700;
  padding: 10px 25px;
  color: ${(props) => props.theme.theme.color};

  ${(props) => props.theme.style.media.desktop} {
    display: none;
  }
`;

interface Props {
  changeTheme: () => void;
  isDarkTheme: boolean;
}

const App: React.FC<Props> = ({ changeTheme, isDarkTheme }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  return (
    <AppWrapper>
      <Navbar
        changeTheme={changeTheme}
        isDarkTheme={isDarkTheme}
        isMenuActive={isMenuActive}
        setIsMenuActive={setIsMenuActive}
      />
      <ContentWrapper>
        <Container>
          <ContentNavbar>
            <MenuBtn onClick={(): void => setIsMenuActive(true)}>Menu</MenuBtn>
            <ThemeTogglerWrapper>
              <ThemeToggler
                changeTheme={changeTheme}
                isDarkTheme={isDarkTheme}
              />
            </ThemeTogglerWrapper>
          </ContentNavbar>
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
        </Container>
      </ContentWrapper>
    </AppWrapper>
  );
};

export default App;
