import React, { useState, useEffect } from 'react';
import Square from './Square';
import Navbar from './Navbar';

const Computer = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (state[index] || calculateWinner(state) || isDraw(state)) {
      return;
    }

    const newState = state.slice();
    newState[index] = isXNext ? 'X' : 'O';
    setState(newState);
    setIsXNext(false); // Switch to computer's turn
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
        return squares[a] === 'X' ? 'Player' : 'Computer';
        
      }
    }
    return null;
  };

  const computerMove = () => {
    const availableMoves = state.map((value, index) => (value === null ? index : null)).filter(index => index !== null);
    if (availableMoves.length > 0) {
      const randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      const newState = state.slice();
      newState[randomIndex] = 'O'; // Computer plays 'O'
      setState(newState);
      setIsXNext(true); // Switch back to player's turn
    }
  };

  useEffect(() => {
    if (!isXNext && !calculateWinner(state) && !isDraw(state)) {
      const timer = setTimeout(() => {
        computerMove();
      }, 500); // Delay for computer move
      return () => clearTimeout(timer);
    }
  }, [isXNext, state]);

  const isDraw = (squares) => {
    return squares.every((square) => square !== null);
  };

  const resetGame = () => {
    setState(Array(9).fill(null));
    setIsXNext(true);
  };

  const playAgain=()=>{
    setState(Array(9).fill(null));
  }

  const winner = calculateWinner(state);
  
  const status = winner ? `Winner is ${winner}` : isDraw(state) ? 'It is a draw!' : `Turn Of ${isXNext ? 'Player' : 'Computer'}`;


  return (
    <>
    <Navbar/>
    <div className='container'>
      <h1 className='title'>Tic Tac Toe</h1>
      <br />
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
      <br />
      <button className="reset" onClick={resetGame}>
        Reset
      </button>
       <button className='p1win'>
        Player's win: {}
       </button>
       <button className='cwin'>
        Computer's win: {}
       </button>
      <button className='Pagainc' onClick={playAgain}>
        Play Again
      </button>
    
    </div>
    </>
  );
}

export default Computer;