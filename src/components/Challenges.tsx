import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Contract from "../web3/Contract";


export default function () {
  const [challenges, setChallenges]: any = useState([]);
  const contract: any = React.useRef();

  useEffect(() => {
    (async function f () {
      const c = new Contract();
      try {
        await c.initWeb3();
      } catch (e) {
        console.log(e);
      }
      try {
        await c.initContract()
      } catch (e) {
        console.log(e)
      }
      try {
        setChallenges(await c.getChallenges());
      } catch (e) {
        console.log(e);
      }
      contract.current = c;
    })();
  }, []);

  console.log(contract);

  return (
    <Container>
      {challenges.map((c: any) => (
        <Challenge>
          <span>Params: {c.params}</span>
          <span>Player: {c.player}</span>
          <span>Reward: {c.reward}</span>
          <span>Time: {c.time}</span>
        </Challenge>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Challenge = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: white;
  span {
    margin: 10px;
  }
`;
