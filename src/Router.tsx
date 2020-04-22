import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useLocation } from 'react-router-dom'
import { animated, useTransition } from 'react-spring'
import styled from "styled-components";
import Landing from "./screens/Landing";
import Game from "./screens/Game";
import Challenges from "./screens/Battles";
import Explanation from "./screens/Walkthrough";
import About from "./screens/About";

export default function Router () {
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

  return (
    <Container>
      {headerTransitions.map(({ item, key, props }) =>
        item && (
          <Header key={key} style={props}>
            <HeaderLink to={'/'} text={'Home'} />
            <HeaderLink to={'/walkthrough'} text={'Walkthrough'} />
            <HeaderLink to={'/battles'} text={'Battles'} />
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
            <Route path="/battles" component={Challenges}/>
            <Route path="/play" component={Game}/>
            <Route path="/about" component={About}/>
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
`;

const Header = styled(animated.div)`
  display: flex;
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
  color: ${props => props.isCurrent 
    ? props.theme.vibrant 
    : props.theme.light
  };
`;

const Page = styled(animated.div)`
  width: 100%;
  height: 93vh;
  bottom: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  will-change: transform, opacity;
  background: ${props => props.theme.dark};
`;
