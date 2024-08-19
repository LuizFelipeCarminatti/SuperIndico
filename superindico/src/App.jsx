import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'

import Home from './components/Home/Home'
import Routes from './components/Links/Routes'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Home />
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
