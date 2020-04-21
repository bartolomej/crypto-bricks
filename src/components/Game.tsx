import Game from "../game";
import Stats from "./Stats";
import React from "react";
import styled from "styled-components";
// @ts-ignore
import UseAnimations from "react-useanimations";
import { Link } from "react-router-dom";


export default function () {

  return (
    <>
      <ExitButton to="/">
        <UseAnimations style={{ transform: 'rotate(45deg)' }} animationKey="plusToX" size={30}/>
      </ExitButton>
      <GameWrapper>
        <Game
          rows={2}
          columns={20}
          onMissed={console.log}
          onScore={console.log}
          width={window.innerWidth - (window.innerWidth / 3)}
          height={window.innerHeight - (window.innerHeight / 5)}
        />
        <Stats
          transactions={[]}
        />
      </GameWrapper>
    </>
  )
}

const ExitButton = styled(Link)`
  position: absolute;
  left: 20px;
  top: 20px;
  color: ${props => props.theme.light};
  transition: 0.6s all ease-in-out;
  &:hover {
    color: ${props => props.theme.primary};
    transform: scale(1.2);
  }
`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
