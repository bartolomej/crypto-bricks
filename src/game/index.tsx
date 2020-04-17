import React, { useEffect } from 'react';
import './style.css';
import Main from "./Main";


export default function () {
  const ref: any = React.useRef(null);

  useEffect(() => {
    const main = new Main(5, 10);
    main.initialize();
    main.render(ref.current);
  }, [ref]);


  return <div id="game-container" ref={ref}/>;
}
