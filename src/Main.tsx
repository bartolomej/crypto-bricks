import React, { useCallback, useState } from 'react'
import { animated, useTransition } from 'react-spring'
import styled from 'styled-components'
import Game from './game/index';
// @ts-ignore
import UseAnimations from "react-useanimations";


export default function App () {
  const [index, set] = useState(0)
  const onClick = useCallback(() => set(state => (state + 1) % 3), [])
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(0,100%,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-50%,0)' },
  });

  const pages = [
    ({ style }: any) => (
      <Page style={{ ...style }}>
        <div>
          <Icon
            zIndex="1"
            transform="rotate(-20deg)"
            src="https://cryptoicons.org/api/white/eth/200"
          />
          <Icon
            src="https://cryptoicons.org/api/white/btc/200"
          />
          <Icon
            zIndex="1"
            transform="rotate(20deg)"
            src="https://cryptoicons.org/api/white/mkr/200"
          />
        </div>
        <Title>Crypto Bricks</Title>
        <Button onClick={onClick}>
          <span>Start</span>
          <UseAnimations animationKey="arrowDown" size={30}/>
        </Button>
      </Page>
    ),
    ({ style }: any) => (
      <Page style={{ ...style }}>
        <Title>Crypto Bricks</Title>
        <Button onClick={onClick}>
          <span>Start</span>
          <UseAnimations animationKey="arrowDown" size={30}/>
        </Button>
      </Page>
    ),
    ({ style }: any) => (
      <Page style={{ ...style }}>
        <ExitButton onClick={onClick}>
          <UseAnimations style={{transform: 'rotate(45deg)'}} animationKey="plusToX" size={30}/>
        </ExitButton>
        <Game
          rows={2}
          columns={30}
          onMissed={() => console.log('Missed')}
          onScore={() => console.log('Scored')}
          width={window.innerWidth - (window.innerWidth / 3)}
          height={window.innerHeight - (window.innerHeight / 5)}
        />
      </Page>
    ),
  ]

  return (
    <Container>
      {transitions.map(({ item, props, key }) => {
        const Page = pages[item]
        return <Page key={key} style={props}/>
      })}
    </Container>
  )
}

const Icon = styled.img<any>`
  z-index: ${props => props.zIndex || 5};
  width: 100px;
  height: 100px;
  margin: 10px;
  transform: ${props => props.transform};
`;

const Title = styled.h1`
  font-size: 4em;
  color: ${props => props.theme.vibrant};
  text-shadow: 0px 2px 40px #00000020, 0px 2px 5px #00000030;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.light};
  span {
    text-transform: uppercase;
    font-size: 2.5em;
    font-weight: bold;
  }
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const ExitButton = styled(Button)`
  position: absolute;
  left: 0;
  top: 0;
`;

const Page = styled(animated.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  will-change: transform, opacity;
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${props => props.theme.dark};
`;
