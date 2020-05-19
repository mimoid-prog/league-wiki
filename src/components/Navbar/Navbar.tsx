import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "assets/images/filled-lol-logo.svg";
import { ReactComponent as Sun } from "assets/images/sun.svg";
import { ReactComponent as Moon } from "assets/images/nature.svg";
import champ from "assets/images/champ.png";
import item from "assets/images/item.png";
import spell from "assets/images/spell.png";
import icon from "assets/images/icon.png";
import NavbarItem from "./NavbarItem";
import background from "assets/images/background.png";

interface NavbarProps {
  readonly isActive: boolean;
}

interface SwitchProps {
  readonly isDarkTheme: boolean;
}

const NavbarWrapper = styled.div<NavbarProps>`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
      rgba(${(props) => props.theme.theme.bg}, 0.8),
      rgba(${(props) => props.theme.theme.bg}, 0.8)
    ),
    url(${background});
  background-size: auto 100vh;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  padding: 30px 0;
  z-index: 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 728px) {
    transform: ${({ isActive }) =>
      isActive ? "translateX(0)" : "translateX(-100%)"};
  }

  .logo {
    margin: 0 auto;
    display: block;
    max-width: 70px;
  }

  ${(props) => props.theme.style.media.desktop} {
    width: 250px;
    position: static;
  }
`;

const NavWrapper = styled.ul`
  list-style: none;
  width: 100%;
  margin: 20px 0;

  ${(props) => props.theme.style.media.desktop} {
    margin: 30px 0;
  }
`;

const Switch = styled.button<SwitchProps>`
  width: 100px;
  background: rgba(${(props) => props.theme.theme.switch}, 0.4);
  margin: 0 auto;
  border-radius: 99px;
  padding: 3px;
  border: 0;
  outline: none;
  cursor: pointer;

  div {
    background: rgb(${(props) => props.theme.theme.switch});
    width: 60%;
    border-radius: 99px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: ${({ isDarkTheme }) => (isDarkTheme ? "0" : "40%")};
    transition: margin-left 0.3s ease;
  }

  svg {
    fill: black;
    display: block;
    width: 25px;

    path {
      fill: rgb(${(props) => props.theme.theme.base});
    }
  }
`;

interface Props {
  setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkTheme: boolean;
}

const Navbar: React.FC<Props> = ({ setIsDarkTheme, isDarkTheme }) => {
  const [isActive, setIsActive] = useState(true);

  return (
    <NavbarWrapper isActive={isActive}>
      <Logo className="logo" />
      <nav>
        <NavWrapper onClick={(): void => setIsActive(!isActive)}>
          <NavbarItem link="/">
            <img src={champ} alt="Champion icon" />
            <h3>Champions</h3>
          </NavbarItem>
          <NavbarItem link="/items">
            <img src={item} alt="Item icon" />
            <h3>Items</h3>
          </NavbarItem>
          <NavbarItem link="/spells">
            <img src={spell} alt="Spell icon" />
            <h3>Spells</h3>
          </NavbarItem>
          <NavbarItem link="/icons">
            <img src={icon} alt="Icon icon" />
            <h3>Icons</h3>
          </NavbarItem>
        </NavWrapper>
      </nav>
      <Switch
        isDarkTheme={isDarkTheme}
        onClick={(): void => setIsDarkTheme(!isDarkTheme)}
      >
        <div>
          {isDarkTheme === true ? (
            <Sun className="sun" />
          ) : (
            <Moon className="moon" />
          )}
        </div>
      </Switch>
    </NavbarWrapper>
  );
};

export default Navbar;
