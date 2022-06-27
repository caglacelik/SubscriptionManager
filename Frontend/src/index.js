import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n'
import { ToggleProvider } from "./context/ToggleContext";
ReactDOM.render(
  <React.StrictMode>
    <ToggleProvider>
      <App />
    </ToggleProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
