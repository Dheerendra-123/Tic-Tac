import React, { useState, useEffect } from 'react';
import useSound from 'use-sound'; // Import the useSound hook
import Square from './Square';
import Navbar from './Navbar';

const Computer = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [playerWins, setPlayerWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);
  const [draws, setDraws] = useState(0);
  
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
    newState[index] = 'X';
    
    // Play sound for player's move
    playXSound();
    
    setState(newState);
    setIsXNext(false); // Switch to computer's turn
  };

  const calculateWinner = (squares) => {
    // Your existing calculateWinner logic
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

  // Your existing findBestMove and findWinningMove functions
  const findBestMove = (squares) => {
    // If computer can win in one move, take that move
    const winningMove = findWinningMove(squares, 'O');
    if (winningMove !== -1) return winningMove;

    // If player can win in one move, block that move
    const blockingMove = findWinningMove(squares, 'X');
    if (blockingMove !== -1) return blockingMove;

    // Take center if available
    if (squares[4] === null) return 4;

    // Take corners if available
    const availableCorners = [0, 2, 6, 8].filter(corner => squares[corner] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // Take any available side
    const availableSides = [1, 3, 5, 7].filter(side => squares[side] === null);
    if (availableSides.length > 0) {
      return availableSides[Math.floor(Math.random() * availableSides.length)];
    }

    // No moves available
    return -1;
  };

  const findWinningMove = (squares, player) => {
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
      // Check if we can win in this line
      if (squares[a] === player && squares[b] === player && squares[c] === null) return c;
      if (squares[a] === player && squares[c] === player && squares[b] === null) return b;
      if (squares[b] === player && squares[c] === player && squares[a] === null) return a;
    }

    return -1; // No winning move found
  };

  const computerMove = () => {
    const newState = [...state];
    const bestMove = findBestMove(newState);
    
    if (bestMove !== -1) {
      newState[bestMove] = 'O';
      
      // Play sound for computer's move
      playOSound();
      
      setState(newState);
    }
    
    setIsXNext(true); // Switch back to player's turn
  };

  useEffect(() => {
    // Check if game just ended and update scores
    const winner = calculateWinner(state);
    const draw = isDraw(state);
    
    if (winner === 'Player') {
      setPlayerWins(prev => prev + 1);
      playWinSound(); // Play winning sound
    } else if (winner === 'Computer') {
      setComputerWins(prev => prev + 1);
      playWinSound(); // Play winning sound
    } else if (draw) {
      setDraws(prev => prev + 1);
      playDrawSound(); // Play draw sound
    }
    
    // Make computer move
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
    setPlayerWins(0);
    setComputerWins(0);
    setDraws(0);
  };

  const playAgain = () => {
    setState(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(state);
  const status = winner 
    ? `Winner is ${winner}` 
    : isDraw(state) 
      ? 'It is a draw!' 
      : `Turn of ${isXNext ? 'Player' : 'Computer'}`;

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
          <button className='Pagainc' onClick={playAgain}>
            Play Again
          </button>
          
          <button className='p1win'>
            Player: {playerWins}
          </button>
          
          <button className='cwin'>
            Computer: {computerWins}
          </button>
          
          <button className='draw'>
            Draws: {draws}
          </button>
          
          <button className="reset" onClick={resetGame}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default Computer;