import React, { useEffect } from 'react';
import './style.css';
import Main from "./Main";


type Props = {
  width: number;
  height: number;
}

export default function ({ height, width} : Props) {
  const ref: any = React.useRef(null);

  useEffect(() => {
    ref.current.style.width = `${width}px`
    ref.current.style.height = `${height}px`
    const main = new Main(ref.current, 1, 10);
    main.initialize();
  }, [ref]);


  return <div id="game-container" ref={ref}/>;
}
