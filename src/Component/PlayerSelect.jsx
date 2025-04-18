import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const PlayerSelect = () => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const p1 = player1.trim() || 'Player 1';
    const p2 = player2.trim() || 'Player 2';
    navigate(`/play?player1=${p1}&player2=${p2}`);
  };

  return (
    <>
      <Navbar />
      <div className="outer">
        <h1 className="m_heading">Enter Players</h1>
        <form onSubmit={handleSubmit} className="input_field">
          <input
            type="text"
            placeholder="Player 1 Name"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Player 2 Name"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
          />
          <button type="submit" className="button">
            Start Game
          </button>
        </form>
      </div>
    </>
  );
};

export default PlayerSelect;