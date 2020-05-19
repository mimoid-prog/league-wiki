import React from "react";
import styled from "styled-components";

const ChampionsWrapper = styled.div`
  background: ${(props) => props.theme.theme.background};
  color: ${(props) => props.theme.theme.color};
`;

const Champions = () => {
  return (
    <ChampionsWrapper>
      <h2>champions</h2>
    </ChampionsWrapper>
  );
};

export default Champions;
