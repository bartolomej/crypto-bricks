import React, { useState } from 'react';
import styled from "styled-components";
import { animated, useTransition } from "react-spring";
import { ReactComponent as blockchain } from '../assets/blockchain.svg';


export default function () {
  const [current, setCurrent]: any = useState(0);

  function onNext () {
    setCurrent((current + 1) % 2)
  }

  const sections = [
    {
      key: 0,
      content: (
        <>
          <Image/>
          <Description>
            Ddnad askdjasndkas fkasf ksajd kasd as
          </Description>
          <NextButton onClick={onNext}>
            Next
          </NextButton>
        </>
      )
    },
    {
      key: 1,
      content: (
        <>
          <Image/>
          <Description>
            Ddnad askdjasndkas fkasf ksajd kasd as
          </Description>
          <NextButton onClick={onNext}>
            next
          </NextButton>
        </>
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
        <Section key={key} style={props}>
          {sections[item].content}
        </Section>
      ))}
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Section = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled(blockchain)`
  width: 200px;
  height: 200px;
`;

const Description = styled.p`
  font-size: 1.2em;
  color: ${props => props.theme.light};
  margin: 20px 0;
`;

const NextButton = styled.button`
  font-size: 1.4em;
  font-weight: bold;
  color: ${props => props.theme.primary};
  &:hover {
    color: ${props => props.theme.vibrant};
    transform: scale(1.2);
  }
`;
