import React, { useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { animated, useTransition } from 'react-spring'
import styled from "styled-components";
import Landing from "./components/Landing";
import Game from "./components/Game";
import * as THREE from 'three'
// @ts-ignore
import VANTA from 'vanta/dist/vanta.net.min'

export default function Router () {
  const vantaRef: any = React.useRef();
  const location = useLocation();
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0, transform: 'translate3d(0,100%,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-50%,0)' },
  });

  useEffect(() => {
    VANTA({
      el: vantaRef.current,
      THREE: THREE,
      color: 0xFFFFFF,
      backgroundColor: 0xFF0D1221
    })
  }, [vantaRef])

  return (
    <Container ref={vantaRef}>
      {transitions.map(({ item: location, props, key }) => (
        <Page key={key} style={props}>
          <Switch location={location}>
            <Route path="/" exact component={Landing}/>
            <Route path="/game" component={Game}/>
          </Switch>
        </Page>
      ))}
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.dark};
  .vanta-canvas {
    opacity: 0.3;
    filter: blur(2px);
  }
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
