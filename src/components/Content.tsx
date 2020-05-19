import React from "react";
import styled from "styled-components";

const ContentWrapper = styled.div`
  background: rgb(${(props) => props.theme.theme.bg});
  color: ${(props) => props.theme.theme.color};
  flex: 1;
`;

const Content: React.FC = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

export default Content;
