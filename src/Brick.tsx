import React from 'react';
import styled from "styled-components";
import logo from './logo.svg'


export default function () {

  return (
    <Container>
      <Image src={logo} />
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  width: 50px;
  height: 50px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;
