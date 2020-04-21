import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Router from "./Router";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";


// https://coolors.co/0d1221-51ded2-d90368-26408b-ffffff
export const theme = {
  dark: 'rgb(13,18,33)',
  vibrant: 'rgba(217, 3, 104, 1)',
  primary: 'rgba(81, 222, 210, 1)',
  darkish: 'rgba(38, 64, 139, 1)',
  light: 'rgba(255, 255, 255, 1)'
}

export function colorWithOpacity (color: string, opacity: number) {
  let [r, g, b] = color.substring(color.indexOf('(') + 1, color.indexOf(')')).split(',').map(e => e.trim());
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
