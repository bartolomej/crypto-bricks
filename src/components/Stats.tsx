import React from 'react';
import styled from 'styled-components';


type Props = {
  transactions: Array<Transaction>;
}

type Transaction = {
  coin: string;
  incoming: boolean;
}

export default function ({transactions}: Props) {

  return (
    <Container>
      <Section>
        <StatsTitle>Your stats</StatsTitle>
        {transactions.map((tx, i) => (
          <Transaction key={i} incoming={tx.incoming}>
            <CoinImg src={require(`../assets/${tx.coin}-white.png`)}/>
            <CoinName>{tx.coin}</CoinName>
          </Transaction>
        ))}
      </Section>
    </Container>
  )
}

const Container = styled.div`
  width: 30%;
  height: 100%;
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
  width: 80%;
`;

const StatsTitle = styled.h3`
  font-size: 2em;
  color: ${props => props.theme.vibrant};
`;

const Transaction = styled.div<any>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  color: ${props => props.incoming ? props.theme.primary : props.theme.vibrant};
`;

const CoinImg = styled.img`
  width: 20px;
  height: 20px;
`;

const CoinName = styled.span`
  text-transform: uppercase;
  font-weight: bold;
`;
