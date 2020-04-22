import React, { useState } from 'react';
import styled from "styled-components";
import { animated, useTransition } from "react-spring";
import { ReactComponent as ethereum } from '../assets/ethereum.svg';
import { ReactComponent as smartContract } from '../assets/smart-contract.svg';
// @ts-ignore
import UseAnimations from "react-useanimations";
import { Link } from "react-router-dom";


export default function () {
  const [current, setCurrent]: any = useState(0);

  function onNext () {
    setCurrent((current + 1) % 2)
  }

  const sections = [
    {
      key: 0,
      content: (
        <SectionWrapper>
          <Ethereum/>
          <Description>
            This website will allow users to post "bounties" with rewards in ETH, that challenge other
            users to beat them in a chosen game with given settings.
          </Description>
          <NextButton onClick={onNext}>
            <UseAnimations
              animationKey="arrowDown"
              size={30}
            />
          </NextButton>
        </SectionWrapper>
      )
    },
    {
      key: 1,
      content: (
        <SectionWrapper>
          <SmartContract/>
          <Description>
            All validation and staking logic will execute on Ethereum distributed computer network in a program known as a "smart contract".
          </Description>
          <DoneButton to="/bounties">
            <UseAnimations
              animationKey="arrowDown"
              size={30}
            />
          </DoneButton>
        </SectionWrapper>
      )
    },
  ]

  const transitions = useTransition(current, item => item, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

  return (
    <Container>
      {transitions.map(({ item, props, key }) => (
        <Subpage key={key} style={props}>
          {sections[item].content}
        </Subpage>
      ))}
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Subpage = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SectionWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Ethereum = styled(ethereum)`
  width: 150px;
  height: 150px;
  margin-bottom: 10px;
`;

const SmartContract = styled(smartContract)`
  width: 150px;
  height: 150px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1.2em;
  color: ${props => props.theme.light};
  margin: 20px 0;
  text-align: center;
`;

const NextButton = styled.button`
  color: ${props => props.theme.primary};
  transition: 0.5s all ease-in-out;
  transform: rotate(-90deg);
  &:hover {
    color: ${props => props.theme.light};
    transform: rotate(-90deg) scale(1.2);
  }
`;

const DoneButton = styled(Link)`
  color: ${props => props.theme.primary};
  transition: 0.5s all ease-in-out;
  &:hover {
    color: ${props => props.theme.light};
    transform: scale(1.2);
  }
`;
