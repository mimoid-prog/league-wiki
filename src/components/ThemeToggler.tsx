import React from "react";
import styled from "styled-components";
import { ReactComponent as Sun } from "assets/images/sun.svg";
import { ReactComponent as Moon } from "assets/images/nature.svg";

interface ThemeTogglerProps {
  readonly isDarkTheme: boolean;
}

const ThemeTogglerWrapper = styled.button<ThemeTogglerProps>`
  width: 100px;
  background: rgba(${(props) => props.theme.theme.toggler}, 0.4);
  margin: 0 auto;
  border-radius: 99px;
  padding: 3px;
  border: 0;
  outline: none;
  cursor: pointer;

  div {
    background: rgb(${(props) => props.theme.theme.toggler});
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
  isDarkTheme: boolean;
  changeTheme: () => void;
}

const ThemeToggler: React.FC<Props> = ({ isDarkTheme, changeTheme }) => {
  return (
    <ThemeTogglerWrapper isDarkTheme={isDarkTheme} onClick={changeTheme}>
      <div>
        {isDarkTheme === true ? (
          <Sun className="sun" />
        ) : (
          <Moon className="moon" />
        )}
      </div>
    </ThemeTogglerWrapper>
  );
};

export default ThemeToggler;
