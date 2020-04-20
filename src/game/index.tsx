import React, { useEffect } from 'react';
import './style.css';
import Main from "./Main";


type Props = {
  width: number;
  height: number;
  rows: number;
  columns: number;
  onMissed: Function;
  onScore: Function;
}

export default function ({ height, width, rows, columns, onMissed, onScore} : Props) {
  const ref: any = React.useRef(null);

  useEffect(() => {
    ref.current.style.width = `${width}px`
    ref.current.style.height = `${height}px`
    const main = new Main({
      container: ref.current,
      rows, columns,
      onMissed, onScore
    });
    main.initialize();
  }, [ref]);


  return <div id="game-container" ref={ref}/>;
}
