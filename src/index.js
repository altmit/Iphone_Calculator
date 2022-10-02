import React from 'react';
import ReactDOM from 'react-dom/client';
import Calculator from './component/calculator';
import './Index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
);
