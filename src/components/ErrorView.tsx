import styled from "styled-components";
// @ts-ignore
import UseAnimations from "react-useanimations";
import React from "react";
import { theme } from "../style";

export default function ErrorView ({ message }: any) {

  return (
    <Container>
      <UseAnimations
        animationKey="activity"
        size={150}
        style={{ padding: 20, color: theme.primary }}
      />
      <ErrorTitle>
        Woops !
      </ErrorTitle>
      <ErrorMessage>
        {message}
      </ErrorMessage>
      <Button target="_blank" href="https://github.com/bartolomej/crypto-bricks/issues">
        Submit an issue
      </Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.light};
`;

const ErrorTitle = styled.h2`
  color: ${props => props.theme.vibrant};
  font-size: 2em;
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.light};
  font-size: 1.2em;
`;

const Button = styled.a`
  color: ${props => props.theme.primary};
  transition: 0.5s all ease-in-out;
  margin-top: 10px;
  &:hover {
    color: ${props => props.theme.vibrant};
  }
`;
