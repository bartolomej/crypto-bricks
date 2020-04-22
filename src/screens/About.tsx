import React from 'react';
import styled from "styled-components";
// @ts-ignore
import UseAnimations from "react-useanimations";


export default function () {

  return (
    <>
      <Title>
        Made with ❤️ by
        <Link
          target="_blank"
          css="margin-left: 4px; transform: none !important;"
          href="https://github.com/bartolomej"
        >
          Bartolomej
        </Link>
      </Title>
      <Wrapper>
        <Description>
          Some of the visual inspiration comes from
          <Link
            target="_blank"
            css="margin-left: 2px;"
            href="https://tokens.net"
          >
            Tokens.net
          </Link>
        </Description>
      </Wrapper>
      <Wrapper>
        <Title>Available on</Title>
        <Link
          target="_blank"
          href="https:/github.com/bartolomej/crypto-bricks"
        >
          <UseAnimations animationKey="github" size={100}/>
        </Link>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 1.8em;
  display: flex;
  align-items: center;
  color: ${props => props.theme.light};
`;

const Description = styled.div`
  font-size: 1.2em;
  color: ${props => props.theme.light};
`;

const Link = styled.a<any>`
  color: ${props => props.theme.primary};
  transition: 0.5s ease-in-out all;
  ${props => props.css};
  &:hover {
    color: ${props => props.theme.vibrant};
    transform: scale(1.1);
  }
`;
