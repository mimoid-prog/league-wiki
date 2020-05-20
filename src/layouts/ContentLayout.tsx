import React from "react";
import styled from "styled-components";

const Navbar = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 30px;
  }

  ${(props) => props.theme.style.media.desktop} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Filters = styled.div`
  ${(props) => props.theme.style.media.desktop} {
    display: flex;
  }
`;

interface Props {
  title: string;
  children: React.ReactNode;
}

const ContentLayout: React.FC<Props> = ({ title, children }) => {
  return (
    <div>
      <Navbar>
        <h2>{title}</h2>
        <Filters>
          <h3>szukaj</h3>
          <h3>sortuj</h3>
        </Filters>
      </Navbar>
      <Content>{children}</Content>
    </div>
  );
};

export default ContentLayout;
