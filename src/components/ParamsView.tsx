import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import styled from "styled-components";
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import { theme } from "../style";

// @ts-ignore
const Handle = Slider.Handle;

export default function ParamsView () {

  const handle = ({ value, dragging, index, ...restProps }: any) => {
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };

  const trackStyle = { backgroundColor: theme.primary, flex: 1 };

  return (
    <Container>
      <FieldWrapper>
        <InputText>Bullet size</InputText>
        <SliderWrapper>
          <Slider
            trackStyle={trackStyle}
            min={0}
            max={20}
            defaultValue={3}
            handle={handle}
          />
        </SliderWrapper>
      </FieldWrapper>
      <FieldWrapper>
        <InputText>Bullet velocity</InputText>
        <SliderWrapper>
          <Slider
            trackStyle={trackStyle}
            min={0}
            max={20}
            defaultValue={3}
            handle={handle}
          />
        </SliderWrapper>
      </FieldWrapper>
      <FieldWrapper>
        <InputText>Player acceleration</InputText>
        <SliderWrapper>
          <Slider
            trackStyle={trackStyle}
            min={0}
            max={20}
            defaultValue={3}
            handle={handle}
          />
        </SliderWrapper>
      </FieldWrapper>
      <FieldWrapper>
        <InputText>Player pad width</InputText>
        <SliderWrapper>
          <Slider
            trackStyle={trackStyle}
            min={0}
            max={20}
            defaultValue={3}
            handle={handle}
          />
        </SliderWrapper>
      </FieldWrapper>
      <FieldWrapper>
        <InputText>Number of target bricks</InputText>
        <SliderWrapper>
          <Slider
            trackStyle={trackStyle}
            min={0}
            max={20}
            defaultValue={3}
            handle={handle}
          />
        </SliderWrapper>
      </FieldWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 70%;
  margin: 40px 0;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const InputText = styled.p`
  color: ${props => props.theme.light};
  font-size: 1em;
  flex: 1;
`;

const SliderWrapper = styled.div`
  flex: 1;
`;
