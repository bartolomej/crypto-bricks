import React from 'react';
import styled from "styled-components";

type Props = {
  x: number;
};

export default function ({ x }: Props) {
  console.log(x);
  return (
    <>
      <Container left={x}>
        hi
      </Container>
    </>
  )
}

const Container: any = styled.div.attrs((props: any) => ({
  style: {
    left: props.left,
  },
}))`
  flex: 1;
  width: 100px;
  height: 50px;
  background: black;
  position: absolute;
  bottom: 0;
`;
