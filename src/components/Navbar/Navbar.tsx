import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "assets/images/filled-lol-logo.svg";
import champ from "assets/images/champ.png";
import item from "assets/images/item.png";
import spell from "assets/images/spell.png";
import icon from "assets/images/icon.png";
import NavbarItem from "./NavbarItem";
import background from "assets/images/background.png";
import ThemeToggler from "components/ThemeToggler";

interface NavbarProps {
  readonly isMenuActive: boolean;
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
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    transform: ${({ isMenuActive }) =>
      isMenuActive ? "translateY(0)" : "translateY(-100%)"};
    transition: ${({ isMenuActive }) =>
      isMenuActive ? "transform 0.5s ease" : "none"};
  }

  .logo {
    margin: 0 auto;
    display: block;
    max-width: 70px;
  }

  ${(props) => props.theme.style.media.desktop} {
    width: 250px;
    position: fixed;
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

const ThemeTogglerWrapper = styled.div`
  display: none;
  ${(props) => props.theme.style.media.desktop} {
    display: block;
    margin: 0 auto;
  }
`;

interface Props {
  isDarkTheme: boolean;
  changeTheme: () => void;
  isMenuActive: boolean;
  setIsMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<Props> = ({
  isDarkTheme,
  changeTheme,
  isMenuActive,
  setIsMenuActive,
}) => {
  return (
    <NavbarWrapper isMenuActive={isMenuActive}>
      <Logo className="logo" />
      <nav>
        <NavWrapper onClick={(): void => setIsMenuActive(false)}>
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
      <ThemeTogglerWrapper>
        <ThemeToggler isDarkTheme={isDarkTheme} changeTheme={changeTheme} />
      </ThemeTogglerWrapper>
    </NavbarWrapper>
  );
};

export default Navbar;
