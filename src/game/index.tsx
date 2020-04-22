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
  onStart: Function;
  onScore: (coin: string) => void;
}

export default function ({
  rows,
  columns,
  width,
  height,
  onMissed,
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
      playerSize
    });
    game.current.initialize();
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
