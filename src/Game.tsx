import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Brick from "./Brick";
import Player from "./Player";
import useAnimation from "./useAnimation";


type Props = {
  columns: number;
  rows: number;
}

export default function ({ columns, rows}: Props) {
  const [playerPosition, setPlayerPosition]: any = useState(0);
  const movementRef: any = React.useRef('NONE');

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
  });

  useAnimation(deltaTime => {
    // Pass on a function to the setter of the state
    // to make sure we always have the latest state
    if (movementRef.current === 'RIGHT') {
      setPlayerPosition((prev: number) => prev + 10);
    }
    if (movementRef.current === 'LEFT') {
      setPlayerPosition((prev: number) => prev - 10);
    }
  });



  function onKeyDown (e: KeyboardEvent) {
    if (e.code === 'ArrowLeft') {
      movementRef.current = 'LEFT';
    }
    if (e.code === 'ArrowRight') {
      movementRef.current = 'RIGHT';
    }
  }

  function onKeyUp (e: KeyboardEvent) {
    movementRef.current = 'NONE';
  }

  return (
    <Container>
      <BricksWrapper>
        {new Array(rows).fill(0).map((e, i) => (
          <BricksRow key={i}>
            {new Array(columns).fill(0).map((e, j) => (
              <Brick key={`${i}-${j}`}/>
            ))}
          </BricksRow>
        ))}
      </BricksWrapper>
      <Player x={playerPosition}/>
    </Container>
  )
}


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const BricksWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const BricksRow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;
