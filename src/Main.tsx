import React from 'react';
import styled from "styled-components";
import Game from './game';

export default function () {

  return (
    <Container>
      <Game
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
