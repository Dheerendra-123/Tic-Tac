import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import TicTacToe from './Component/TicTacToe';
import Computer from './Component/Computer';
import PlayerSelect from './Component/PlayerSelect';
import './App.css';

function App() {
  return (
    <Router>
      <div className="background"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<TicTacToe />} />
        <Route path="/computer" element={<Computer />} />
        <Route path="/player-select" element={<PlayerSelect />} />
      </Routes>
    </Router>
  );
}

export default App;