import React from "react";

type Prop = (deltaTime: number) => void;

export default function (callback: Prop) {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef: any = React.useRef();
  const previousTimeRef: any = React.useRef();

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime)
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
}
