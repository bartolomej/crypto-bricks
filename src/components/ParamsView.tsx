import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import styled from "styled-components";
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import { theme } from "../style";

// @ts-ignore
const Handle = Slider.Handle;

type Props = {
  columns: number;
  onColumnsChange: (n: number) => void;
  rows: number;
  onRowsChange: (n: number) => void;
  bulletSize: number;
  onBulletSizeChange: (n: number) => void;
  velocity: number;
  onVelocityChange: (n: number) => void;
  playerSize: number;
  onPlayerSizeChange: (n: number) => void;
}

export default function ParamsView ({
  columns,
  onColumnsChange,
  rows,
  onRowsChange,
  bulletSize,
  onBulletSizeChange,
  velocity,
  onVelocityChange,
  playerSize,
  onPlayerSizeChange
}: Props) {

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
            min={20}
            max={100}
            defaultValue={bulletSize}
            handle={props => {
              onBulletSizeChange(props.value);
              return handle(props);
            }}
          />
        </SliderWrapper>
      </FieldWrapper>
      <FieldWrapper>
        <InputText>Player size</InputText>
        <SliderWrapper>
          <Slider
            trackStyle={trackStyle}
            min={60}
            max={250}
            defaultValue={playerSize}
            handle={props => {
              onPlayerSizeChange(props.value);
              return handle(props);
            }}
          />
        </SliderWrapper>
      </FieldWrapper>
      <FieldWrapper>
        <InputText>Bullet and Player velocity</InputText>
        <SliderWrapper>
          <Slider
            trackStyle={trackStyle}
            min={2}
            max={28}
            defaultValue={velocity}
            handle={props => {
              onVelocityChange(props.value);
              return handle(props);
            }}
          />
        </SliderWrapper>
      </FieldWrapper>
      <FieldWrapper>
        <InputText>Brick columns</InputText>
        <SliderWrapper>
          <Slider
            trackStyle={trackStyle}
            min={5}
            max={40}
            step={1}
            defaultValue={columns}
            handle={props => {
              onColumnsChange(props.value);
              return handle(props);
            }}
          />
        </SliderWrapper>
      </FieldWrapper>
      <FieldWrapper>
        <InputText>Brick rows</InputText>
        <SliderWrapper>
          <Slider
            trackStyle={trackStyle}
            min={1}
            max={10}
            step={1}
            defaultValue={rows}
            handle={props => {
              onRowsChange(props.value);
              return handle(props);
            }}
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
