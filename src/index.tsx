import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './pages/App'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from "react-cookie";

const rootElement = document.getElementById('root') as HTMLElement;
const render = rootElement.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;

render(
  <React.StrictMode>
    <CookiesProvider>
      <Router>
        <App />
      </Router>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
