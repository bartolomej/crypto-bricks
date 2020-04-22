import Game from "../game";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../components/Modal";
import ParamsView from "../components/ParamsView";
import { Coin } from '../game/objects/Brick'


type Transaction = {
  coin: string;
  incoming: boolean;
}

const gameHeight = window.innerHeight - (window.innerHeight / 5);
const gameWidth = window.innerWidth - (window.innerWidth / 3);

export default function () {
  const gameRef: any = React.useRef();
  const txWrapper: any = React.useRef();
  const [transactions, setTx]: [Array<Transaction>, any] = useState([]);
  const [time, setTime]: any = useState(0);
  const [int, setInt]: any = useState(null);
  const [showModal, setShowModal]: any = useState(false);
  // game parameters state
  const [rows, setRows]: any = useState(2);
  const [columns, setColumns]: any = useState(20);
  const [velocity, setVelocity]: any = useState(8);
  const [playerSize, setPlayerSize]: any = useState(150);
  const [bulletSize, setBulletSize]: any = useState(40);

  useEffect(() => () => {
    int && clearInterval(int)
  }, []);
  useEffect(() => {
    txWrapper.current.scrollTop = 0
  }, [transactions]);

  function onMissed () {
    setTx((prev: any) => [...prev, { coin: prev[prev.length - 1].coin, incoming: false }]);
  }

  function onScore (coin: Coin) {
    setTx((prev: any) => [...prev, { coin, incoming: true }]);
  }

  function onFinished () {
    console.log('finished');
  }

  function onStart () {
    setInt(setInterval(() => {
      setTime((prev: number) => prev + 1);
    }, 1000));
  }

  function onSettings () {
    gameRef.current.stopAnimation();
    setShowModal(true);
  }

  function onCloseSettings () {
    gameRef.current.startAnimation();
    setShowModal(false)
  }

  function onReset () {
    clearInterval(int);
    setTx([]);
    setTime(0);
    gameRef.current.reset();
  }

  const score = transactions.length > 0
    ? transactions
      .map(c => c.incoming ? 1 : -1)
      .reduce((e: any, p: any) => e + p)
    : 0;

  return (
    <>
      <Modal show={showModal} onClose={onCloseSettings}>
        <Title>Game settings</Title>
        <ParamsView
          columns={columns}
          totalBricks={rows * columns}
          onTotalBricksChange={total => setRows(total / columns)}
          bulletSize={bulletSize}
          onBulletSizeChange={setBulletSize}
          playerSize={playerSize}
          onPlayerSizeChange={setPlayerSize}
          velocity={velocity}
          onVelocityChange={setVelocity}
        />
      </Modal>
      <GameWrapper>
        <Game
          gameRef={gameRef}
          rows={rows}
          columns={columns}
          onFinished={onFinished}
          onMissed={onMissed}
          onScore={onScore}
          onStart={onStart}
          width={gameWidth}
          height={gameHeight}
          playerSize={playerSize}
          bulletSize={bulletSize}
          velocity={velocity}
        />
        <StatsContainer h={gameHeight}>
          <Section>
            <TextWrapper>
              <StatsText>Elapsed time: <span>{time}s</span></StatsText>
              <StatsText>Total score: <span>{score}</span></StatsText>
            </TextWrapper>
            <TxWrapper ref={txWrapper}>
              {transactions.map((tx: any, i) => (
                <Transaction key={i} incoming={tx.incoming}>
                  <CoinImg src={require(`../game/assets/${tx.coin.symbol.toLowerCase()}.png`)}/>
                  <TxText>{tx.coin.symbol}</TxText>
                  <TxText>{tx.incoming ? '+ 1' : '- 1'}</TxText>
                </Transaction>
              ))}
            </TxWrapper>
            <ControlsWrapper>
              <Button onClick={onReset}>
                Reset
              </Button>
              <Button onClick={onSettings}>
                Settings
              </Button>
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
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin: 15px 0;
`;

const TxWrapper = styled.div`
  overflow-y: scroll;
  width: 100%;
  flex: 7;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
`;

const Title = styled.h3`
  font-size: 2em;
  color: ${props => props.theme.primary};
`;

const StatsText = styled.span`
  font-size: 1em;
  width: 100%;
  text-align: center;
  color: ${props => props.theme.light};
  span {
    display: inline-block;
    font-weight: bold;
    width: 30px;
  }
`;

const Button = styled.button`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.primary};
  transition: 0.3s all ease-in-out;
  padding: 5px 10px;
  font-size: 1em;
  &:hover {
    color: ${props => props.theme.light};
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
