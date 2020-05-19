import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledLink = styled(NavLink)`
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  color: ${(props) => props.theme.theme.color};
  text-decoration: none;

  h3 {
    font-weight: 400;
    line-height: 1;
    margin-top: 5px;
  }

  &.active {
    background: rgba(${(props) => props.theme.theme.base}, 0.3);
  }

  &:hover {
    background: rgba(${(props) => props.theme.theme.base}, 0.2);
  }

  img {
    width: 40px;
  }
`;

interface Props {
  link: string;
  children: any;
}

const NavbarItem: React.FC<Props> = ({ link, children }) => {
  return (
    <li>
      <StyledLink to={link} exact>
        {children}
      </StyledLink>
    </li>
  );
};

export default NavbarItem;
