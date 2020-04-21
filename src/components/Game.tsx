import Game from "../game";
import Stats from "./Stats";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// @ts-ignore
import UseAnimations from "react-useanimations";
import { Link } from "react-router-dom";


const gameHeight = window.innerHeight - (window.innerHeight / 5);
const gameWidth = window.innerWidth - (window.innerWidth / 3);

export default function () {
  const [transactions, setTx]: any = useState([]);
  const [time, setTime]: any = useState(0);
  const [int, setInt]: any = useState(null);

  useEffect(() => () => int && clearInterval(int), []);

  function onMissed () {
    setTx((prev: any) => [...prev, { coin: prev[prev.length - 1].coin, incoming: false }]);
  }

  function onScore (coin: string) {
    setTx((prev: any) => [...prev, { coin, incoming: true }]);
  }

  function onStart () {
    setInt(setInterval(() => {
      setTime((prev: number) => prev + 1);
    }, 1000));
  }


  return (
    <>
      <ExitButton to="/">
        <UseAnimations style={{ transform: 'rotate(45deg)' }} animationKey="plusToX" size={30}/>
      </ExitButton>
      <GameWrapper>
        <Game
          rows={2}
          columns={20}
          onMissed={onMissed}
          onScore={onScore}
          onStart={onStart}
          width={gameWidth}
          height={gameHeight}
        />
        <Stats
          time={time}
          height={gameHeight}
          transactions={transactions}
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
