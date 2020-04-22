import Game from "../game";
import React, { useEffect, useState } from "react";
import styled from "styled-components";


type Transaction = {
  coin: string;
  incoming: boolean;
}

const gameHeight = window.innerHeight - (window.innerHeight / 5);
const gameWidth = window.innerWidth - (window.innerWidth / 3);

export default function () {
  const [transactions, setTx]: [Array<Transaction>, any] = useState([]);
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

  function onReset () {

  }

  const score = transactions.length > 0
    ? transactions
      .map(c => c.incoming ? 1 : -1)
      .reduce((e: any, p: any) => e + p)
    : 0;

  return (
    <>
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
        <StatsContainer h={gameHeight}>
          <Section>
            <TextWrapper>
              <StatsTitle>Your stats</StatsTitle>
              <StatsText>Elapsed time: <b>{time}s</b></StatsText>
              <StatsText>Total score: <b>{score}</b></StatsText>
            </TextWrapper>
            <TxWrapper>
              {transactions.map((tx, i) => (
                <Transaction key={i} incoming={tx.incoming}>
                  <CoinImg src={require(`../assets/${tx.coin}-white.png`)}/>
                  <TxText>{tx.coin}</TxText>
                  <TxText>{tx.incoming ? '+ 1' : '- 1'}</TxText>
                </Transaction>
              ))}
            </TxWrapper>
            <ControlsWrapper>
              <StatsButton onClick={onReset}>
                Post challenge
              </StatsButton>
              <StatsButton onClick={onReset}>
                Reset
              </StatsButton>
            </ControlsWrapper>
          </Section>
        </StatsContainer>
      </GameWrapper>
    </>
  )
}

const GameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const StatsContainer = styled.div<any>`
  width: 30%;
  height: ${props => `${props.h}px` || '100%'};
  background: ${props => props.theme.darkish};
  border-radius: 10px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  height: 100%;
  overflow-y: scroll;
`;

const ControlsWrapper = styled.div`
  display: flex;
  flex: 1.5;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const TextWrapper = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  align-items: center;
`;

const TxWrapper = styled.div`
  overflow-y: scroll;
  width: 100%;
  flex: 7;
`;

const StatsTitle = styled.h3`
  font-size: 2em;
  color: ${props => props.theme.primary};
`;

const StatsText = styled.span`
  font-size: 1em;
  color: ${props => props.theme.light};
`;

const StatsButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.primary};
  transition: 0.3s all ease-in-out;
  padding: 5px 20px;
  border-radius: 5px;
  border: 2px solid ${props => props.theme.primary};
  font-size: 1em;
  &:hover {
    color: ${props => props.theme.light};
    background: ${props => props.theme.primary};
  }
`;

const Transaction = styled.div<any>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  color: ${props => props.incoming ? props.theme.primary : props.theme.vibrant};
  animation: 0.5s ease-in-out forwards showUp;
  @keyframes showUp {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const CoinImg = styled.img`
  width: 20px;
  height: 20px;
`;

const TxText = styled.span`
  text-transform: uppercase;
  font-weight: bold;
`;
