import styled from "styled-components";
// @ts-ignore
import UseAnimations from "react-useanimations";
import React from "react";
import { theme } from "./index";


export function Loading () {

  const Container = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    backdrop-filter: blur(1px);
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return (
    <Container>
      <UseAnimations
        animationKey="loading2"
        size={70}
        style={{ padding: 100, color: theme.primary, zIndex: 10 }}
      />
    </Container>
  )
}
