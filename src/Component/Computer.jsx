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
  const [playerSymbol, setPlayerSymbol] = useState('X');
  const [computerSymbol, setComputerSymbol] = useState('O');
  
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
    newState[index] = playerSymbol;
    
    // Play sound based on symbol
    if (playerSymbol === 'X') {
      playXSound();
    } else {
      playOSound();
    }
    
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
        return squares[a] === playerSymbol ? 'Player' : 'Computer';
      }
    }
    return null;
  };

  const isDraw = (squares) => {
    return squares.every((square) => square !== null);
  };

  // Score function for minimax algorithm
  const evaluate = (squares) => {
    const winner = calculateWinner(squares);
    if (winner === 'Computer') return 10;
    if (winner === 'Player') return -10;
    return 0;
  };

  // Alpha-Beta pruning implementation
  const minimax = (squares, depth, isMaximizing, alpha, beta) => {
    const winner = calculateWinner(squares);
    
    // Terminal states
    if (winner === 'Computer') return 10 - depth;
    if (winner === 'Player') return depth - 10;
    if (isDraw(squares)) return 0;
    
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          squares[i] = computerSymbol;
          const score = minimax(squares, depth + 1, false, alpha, beta);
          squares[i] = null;
          bestScore = Math.max(score, bestScore);
          alpha = Math.max(alpha, bestScore);
          if (beta <= alpha) break; // Alpha-Beta pruning
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          squares[i] = playerSymbol;
          const score = minimax(squares, depth + 1, true, alpha, beta);
          squares[i] = null;
          bestScore = Math.min(score, bestScore);
          beta = Math.min(beta, bestScore);
          if (beta <= alpha) break; // Alpha-Beta pruning
        }
      }
      return bestScore;
    }
  };

  const findBestMove = (squares) => {
    let bestScore = -Infinity;
    let bestMove = -1;
    
    // First check if there's a winning move or blocking move
    const winningMove = findWinningMove(squares, computerSymbol);
    if (winningMove !== -1) return winningMove;
    
    const blockingMove = findWinningMove(squares, playerSymbol);
    if (blockingMove !== -1) return blockingMove;
    
    // Apply alpha-beta pruning for deeper analysis
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = computerSymbol;
        const score = minimax(squares, 0, false, -Infinity, Infinity);
        squares[i] = null;
        
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    
    return bestMove;
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
      newState[bestMove] = computerSymbol;
      
      // Play sound based on symbol
      if (computerSymbol === 'X') {
        playXSound();
      } else {
        playOSound();
      }
      
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
    
    // Make computer move if it's computer's turn
    if (!isXNext && !calculateWinner(state) && !isDraw(state)) {
      const timer = setTimeout(() => {
        computerMove();
      }, 500); // Delay for computer move
      return () => clearTimeout(timer);
    }
    
    // If computer is X and it's first move, make the move
    if (isXNext && computerSymbol === 'X' && state.every(s => s === null)) {
      const timer = setTimeout(() => {
        computerMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, state]);

  const resetGame = () => {
    setState(Array(9).fill(null));
    setIsXNext(true);
    setPlayerWins(0);
    setComputerWins(0);
    setDraws(0);
    randomizeStartingPlayer();
  };

  const playAgain = () => {
    setState(Array(9).fill(null));
    randomizeStartingPlayer();
  };
  
  const randomizeStartingPlayer = () => {
    // Randomly decide who goes first and who uses which symbol
    const randomChoice = Math.random();
    
    if (randomChoice < 0.5) {
      setPlayerSymbol('X');
      setComputerSymbol('O');
      setIsXNext(true); // Player goes first
    } else {
      setPlayerSymbol('O');
      setComputerSymbol('X');
      setIsXNext(true); // Computer will go first (handled in useEffect)
    }
  };

  const winner = calculateWinner(state);
  const status = winner 
    ? `Winner is ${winner}` 
    : isDraw(state) 
      ? 'It is a draw!' 
      : `Turn of ${isXNext ? 'Player' : 'Computer'} (${isXNext ? playerSymbol : computerSymbol})`;

  return (
    <>
      <Navbar />
      <div className='container'>
        <h1 className='title'>Tic Tac Toe</h1>
        <div className="status">{status}</div>
        {/* <div className="player-info">
          You are playing as: <strong>{playerSymbol}</strong>
        </div> */}
        
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