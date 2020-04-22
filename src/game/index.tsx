import React, { useEffect } from 'react';
import './style.css';
import Main from "./Main";


type Props = {
  width: number;
  height: number;
  rows: number;
  columns: number;
  bulletSize: number;
  playerSize: number;
  velocity: number;
  onMissed: Function;
  onFinished: Function;
  onStart: Function;
  onScore: (coin: string) => void;
  gameRef?: any;
}

export default function ({
  gameRef,
  rows,
  columns,
  width,
  height,
  onMissed,
  onFinished,
  onScore,
  onStart,
  velocity,
  bulletSize,
  playerSize
}: Props) {
  const container: any = React.useRef();
  const game: any = React.useRef();

  useEffect(() => {
    const el = container.current;
    if (!el) return;
    el.style.width = `${width}px`
    el.style.height = `${height}px`
    game.current = new Main({
      container: el,
      rows, columns,
      onMissed, onScore, onStart,
      velocity,
      bulletSize,
      playerSize,
      onFinished
    });
    game.current.initialize();
    if (gameRef) {
      gameRef.current = game.current;
    }
  }, []);

  useEffect(() => {
    game.current.setBricksQuantity(rows, columns);
  }, [rows, columns]);

  useEffect(() => {
    game.current.setVelocity(velocity);
  }, [velocity]);

  useEffect(() => {
    game.current.setBulletSize(bulletSize);
  }, [bulletSize]);

  useEffect(() => {
    game.current.setPlayerSize(playerSize);
  }, [playerSize]);

  return <div id="game-container" ref={container}/>;
}
