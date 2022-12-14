import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import HomePage from './HomePage';
import reportWebVitals from './reportWebVitals';
import Registration from './Registration'

import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";


ReactDOM.render(


  

  <BrowserRouter>
    <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<App />}></Route>
        <Route path="/register" element={<Registration />}></Route>
    </Routes>
  </BrowserRouter>
  






,document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
