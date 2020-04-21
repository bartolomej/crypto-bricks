import React from "react";
// @ts-ignore
import eth from "../assets/eth-white.png";
// @ts-ignore
import btc from "../assets/btc-white.png";
// @ts-ignore
import mkr from "../assets/mkr-white.png";
import styled from "styled-components";
// @ts-ignore
import UseAnimations from "react-useanimations";
import { colorWithOpacity } from "../index";
import { Link } from "react-router-dom";


// TODO: https://vincentgarreau.com/particles.js/

export default function () {

  return (
    <>
      <div>
        <Icon
          transform="rotate(-20deg)"
          src={eth}
          delay={"1"}
        />
        <Icon
          src={btc}
        />
        <Icon
          transform="rotate(20deg)"
          src={mkr}
          delay={"2"}
        />
      </div>
      <Title>Crypto Bricks</Title>
      <LinkButton to="/game">
        <span>Start</span>
        <UseAnimations animationKey="arrowDown" size={30}/>
      </LinkButton>
    </>
  )
}

const Icon = styled.img<any>`
  width: 100px;
  height: 100px;
  margin: 10px;
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  @keyframes float {
    0% {
      box-shadow: 0 5px 15px 0 ${props => colorWithOpacity(props.theme.light, 0.3)};
      transform: translateY(0px);
    }
    50% {
      box-shadow: 0 25px 15px 0 ${props => colorWithOpacity(props.theme.light, 0.1)};
      transform: translateY(-20px);
    }
    100% {
      box-shadow: 0 5px 15px 0 ${props => colorWithOpacity(props.theme.light, 0.3)};
      transform: translateY(0px);
    }
  }
`;

const Title = styled.h1`
  font-size: 4em;
  color: ${props => props.theme.vibrant};
`;

const LinkButton = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.light};
  transition: 0.6s all ease-in-out;
  span {
    text-transform: uppercase;
    font-size: 2em;
    font-weight: bold;
  }
  &:hover {
    color: ${props => props.theme.primary};
    transform: scale(1.2);
  }
`;