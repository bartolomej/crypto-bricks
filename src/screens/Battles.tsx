import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Contract from "../web3/Contract";
import { Link } from "react-router-dom";
// @ts-ignore
import UseAnimations from "react-useanimations";
import ErrorView from "../components/ErrorView";
import LoadingView from "../components/LoadingView";


export default function () {
  const [challenges, setChallenges]: any = useState([]);
  const [isLoading, setLoading]: any = useState(true);
  const [error, setError]: any = useState(null);
  const contract: any = React.useRef();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      initWeb3().then(() => setLoading(false));
    } else {
      setError(new Error('This feature is still under development. Come back later 🤙.'))
      setLoading(false);
    }
  }, []);

  async function initWeb3 () {
    const c = new Contract();
    try {
      await c.initWeb3();
    } catch (e) {
      setError(e);
      console.log('initWeb3 error: ', e);
    }
    try {
      await c.initContract()
    } catch (e) {
      setError(e);
      console.log('initContract error: ', e);
    }
    try {
      setChallenges(await c.getChallenges());
    } catch (e) {
      setError(e);
      console.log('challenges fetch error: ', e);
    }
    contract.current = c;
  }


  return (
    <>
      <NavigationRow>
        <NavLink to="/challenges">
          Open
        </NavLink>
        <NavLink to="/challenges">
          Closed
        </NavLink>
        <NavLink to="/challenges">
          Create
        </NavLink>
      </NavigationRow>
      <Container>
        {isLoading && <LoadingView/>}
        {error && (
          <ErrorView message={error.message}/>
        )}
        <ChallengeWrapper>
          {challenges.map((e: any) => new Array(20).fill(e)).flat().map((c: any, i: number) => (
            <Challenge key={i}>
              <span>Params: {c.params}</span>
              <span>Player: {c.player}</span>
              <span>Reward: {c.reward}</span>
              <span>Time: {c.time}</span>
              <PlayButton to="play">
                Play
                <UseAnimations animationKey="arrowDown" size={15}/>
              </PlayButton>
            </Challenge>
          ))}
        </ChallengeWrapper>
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 95vh;
  width: 100vw;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavigationRow = styled.div`
  background: ${props => props.theme.darkish};
  width: 100vw;
  height: 5vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const NavLink = styled(Link)`
  font-weight: bold;
  color: ${props => props.theme.light};
  &:hover {
    color: ${props => props.theme.vibrant};
    text-underline: ${props => props.theme.vibrant};
  }
`;

const PlayButton = styled(Link)`
  padding: 5px 20px;
  border-radius: 5px;
  font-weight: bold;
  color: ${props => props.theme.primary};
  flex-direction: row;
  display: flex;
  align-items: center;
  div {
    margin-left: 15px;
    transform: rotate(-90deg);
  }
  &:hover {
    color: ${props => props.theme.vibrant};
  }
`;

const ChallengeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 30px 30px;
`;

const Challenge = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: ${props => props.theme.darkish};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  color: white;
  span {
    margin: 10px;
  }
`;
