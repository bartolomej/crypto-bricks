import React from "react";
import styled from "styled-components";
// @ts-ignore
import UseAnimations from "react-useanimations";
import { animated, useTransition } from "react-spring";


type Props = {
  children: Array<React.ReactElement> | React.ReactElement;
  onClose: Function;
  show: boolean;
}

export default function ({ children, onClose, show }: Props): any {

  const transitions = useTransition(show, null, {
    from: { transform: 'translate3d(0,-40px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0, 0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,-40px,0)', opacity: 0 },
  })

  return transitions.map(({ item, props, key }) => item && (
    <Container key={key} style={props}>
      <InnerWrapper>
        <CloseButton onClick={() => onClose()}>
          <UseAnimations
            animationKey="plusToX"
            size={30}
            style={{ transform: 'rotate(45deg)' }}
          />
        </CloseButton>
        {children}
      </InnerWrapper>
    </Container>
  ))
}

const Container = styled(animated.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  backdrop-filter: blur(2px);
`;

const InnerWrapper = styled.div`
  position: relative;
  height: 50%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: ${props => props.theme.dark};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  color: ${props => props.theme.light};
  transition: 0.5s all ease-in-out;
  &:hover {
    transform: scale(1.1);
    color: ${props => props.theme.primary};
  }
`;
