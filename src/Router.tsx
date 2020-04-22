import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useLocation } from 'react-router-dom'
import { animated, useTransition } from 'react-spring'
import styled from 'styled-components';
import Challenges from "./screens/Battles";
import Explanation from "./screens/Walkthrough";
import About from "./screens/About";
import Landing from "./screens/Landing";
import Game from "./screens/Game";
import * as THREE from 'three'
// @ts-ignore
import VANTA from 'vanta/dist/vanta.net.min'

export default function Router () {
  const vantaRef: any = React.useRef();
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    setShowHeader(location.pathname !== '/');
  }, [location]);

  const pageTransitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0, transform: 'translate3d(0,100%,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-50%,0)' },
  });

  const headerTransitions = useTransition(showHeader, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  function HeaderLink ({to, text}: {to: string, text: string}) {
    return (
      <HLink isCurrent={location.pathname === to} to={to}>
        {text}
      </HLink>
    )
  }

  useEffect(() => {
    VANTA({
      el: vantaRef.current,
      THREE: THREE,
      color: 0xFFFFFF,
      backgroundColor: 0xFF0D1221
    });
  }, [vantaRef])

  return (
    <Container useVanta={location.pathname !== '/play'} ref={vantaRef}>
      {headerTransitions.map(({ item, key, props }) =>
        item && (
          <Header key={key} style={props}>
            <HeaderLink to={'/'} text={'Home'} />
            <HeaderLink to={'/walkthrough'} text={'Walkthrough'} />
            <HeaderLink to={'/bounties'} text={'Bounties'} />
            <HeaderLink to={'/play'} text={'Play'} />
            <HeaderLink to={'/about'} text={'About'} />
          </Header>
        )
      )}
      {pageTransitions.map(({ item: location, props, key }) => (
        <Page key={key} style={props}>
          <Switch location={location}>
            <Route path="/" exact component={Landing}/>
            <Route path="/walkthrough" component={Explanation}/>
            <Route path="/bounties" component={Challenges}/>
            <Route path="/play" component={Game}/>
            <Route path="/about" component={About}/>
          </Switch>
        </Page>
      ))}
    </Container>
  )
}

const Container = styled.div<any>`
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.dark};
  .vanta-canvas {
    opacity: 0.3;
    filter: blur(2px);
    ${props => props.useVanta ? '' : 'display: none;'};
  }
`;

const Header = styled(animated.div)`
  display: flex;
  z-index: 1;
  position: absolute;
  top: 0;
  width: 100vw;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 7vh;
  background: ${props => props.theme.darkish};
`;

const HLink = styled(Link)<any>`
  font-weight: bold;
  transition: 0.5s all ease-in-out;
  color: ${props => props.isCurrent 
    ? props.theme.primary 
    : props.theme.light
  };
  &:hover {
    transform: scale(1.1);
  }
`;

const Page = styled(animated.div)`
  width: 100%;
  z-index: 1;
  height: 93vh;
  bottom: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  will-change: transform, opacity;
`;
