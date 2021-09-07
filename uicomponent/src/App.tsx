import React from 'react';
import logo from './logo.svg';
import { Hello } from './Hello';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Hello />
      </header>
    </div>
  );
}

export default App;
