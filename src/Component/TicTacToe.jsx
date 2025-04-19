import React, { useState } from 'react';
import useSound from 'use-sound'; // Import the useSound hook
import Square from './Square';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

const TicTacToe = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const location = useLocation();
    
  const queryParams = new URLSearchParams(location.search);
  const player1 = queryParams.get('player1') || 'Player 1';
  const player2 = queryParams.get('player2') || 'Player 2';
  const [winCount, setWinCount] = useState({ player1: 0, player2: 0, draws: 0 });
  
  // Add sound hooks
  const [playXSound] = useSound('/sounds/x.mp3', { volume: 0.5 });
  const [playOSound] = useSound('/sounds/o.mp3', { volume: 0.5 });
  const [playWinSound] = useSound('/sounds/win.mp3', { volume: 0.7 });
  const [playDrawSound] = useSound('/sounds/draw.mp3', { volume: 0.6 });

  const handleClick = (index) => {
    if (state[index] || calculateWinner(state) || isDraw(state)) {
      return;
    }
    
    const newState = state.slice();
    newState[index] = isXNext ? 'X' : 'O';
    
    // Play the appropriate move sound
    if (isXNext) {
      playXSound();
    } else {
      playOSound();
    }
    
    setState(newState);
    setIsXNext(!isXNext);
    
    const winner = calculateWinner(newState);
    if (winner) {
      // Play winning sound
      playWinSound();
      updateWinCount(winner);
    } else if (isDraw(newState)) {
      // Play draw sound
      playDrawSound();
      updateDrawCount();
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        if (squares[a] === 'X') {
          return player1;
        } else {
          return player2;
        }
      }
    }
    return null;
  };

  const isDraw = (squares) => {
    return squares.every((square) => square !== null) && !calculateWinner(squares);
  };

  const updateWinCount = (winner) => {
    setWinCount((prevCount) => ({
      ...prevCount,
      [winner === player1 ? 'player1' : 'player2']: prevCount[winner === player1 ? 'player1' : 'player2'] + 1,
    }));
  };

  const updateDrawCount = () => {
    setWinCount((prevCount) => ({
      ...prevCount,
      draws: prevCount.draws + 1
    }));
  };

  const resetGame = () => {
    setState(Array(9).fill(null));
    setIsXNext(true);
    setWinCount({ player1: 0, player2: 0, draws: 0 });
  };

  const playAgain = () => {
    setState(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(state);
  const status = winner
    ? `Winner is ${winner}`
    : isDraw(state)
      ? 'It\'s a draw!'
      : `${isXNext ? player1 : player2}'s Turn`;

  return (
    <>
      <Navbar />
      <div className='container'>
        <h1 className='title'>Tic Tac Toe</h1>
        <div className="status">{status}</div>
        
        <div className="board">
          <div className="row1">
            <Square onClick={() => handleClick(0)} value={state[0]} />
            <Square onClick={() => handleClick(1)} value={state[1]} />
            <Square onClick={() => handleClick(2)} value={state[2]} />
          </div>
          <div className="row2">
            <Square onClick={() => handleClick(3)} value={state[3]} />
            <Square onClick={() => handleClick(4)} value={state[4]} />
            <Square onClick={() => handleClick(5)} value={state[5]} />
          </div>
          <div className="row3">
            <Square onClick={() => handleClick(6)} value={state[6]} />
            <Square onClick={() => handleClick(7)} value={state[7]} />
            <Square onClick={() => handleClick(8)} value={state[8]} />
          </div>
        </div>
        
        <div className="game-controls">
          <button className='Pagain' onClick={playAgain}>
            Play Again
          </button>
          
          <button className='p1win'>
            {player1}: {winCount.player1}
          </button>
          
          <button className='p2win'>
            {player2}: {winCount.player2}
          </button>

          <button className='draw'>
            Draws: {winCount.draws}
          </button>
          
          <button className="reset" onClick={resetGame}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default TicTacToe;