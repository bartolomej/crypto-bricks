import React from 'react';
import styled from 'styled-components';


type Props = {
  time: number;
  transactions: Array<Transaction>;
  height: number;
}

type Transaction = {
  coin: string;
  incoming: boolean;
}

export default function ({ transactions, time, height }: Props) {

  const score = transactions.length > 0
    ? transactions
      .map(c => c.incoming ? 1 : -1)
      .reduce((e: any, p: any) => e + p)
    : 0

  return (
    <Container h={height}>
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
      </Section>
    </Container>
  )
}

const Container = styled.div<any>`
  width: 30%;
  height: ${props => `${props.h}px` || '100%'};
  background: rgba(27, 35, 56, 0.5);
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

const StatsTitle = styled.h3`
  font-size: 2em;
  color: ${props => props.theme.vibrant};
`;

const StatsText = styled.span`
  font-size: 1em;
  color: ${props => props.theme.light};
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TxWrapper = styled.div`
  overflow-y: scroll;
  width: 100%;
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
