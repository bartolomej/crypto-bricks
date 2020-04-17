import React from 'react';
import styled from "styled-components";
import Game from './game';

export default function () {

  return (
    <Container>
      <GameContainer>
        <Game/>
      </GameContainer>
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

const GameContainer = styled.div`
  width: 50%;
  height: 50%;
  border: 2px solid black;
`;

