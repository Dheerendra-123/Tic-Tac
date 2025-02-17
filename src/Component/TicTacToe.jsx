import React, { useState } from 'react';
import Square from './Square';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import cross from '../assets/cross.png'
import circle from '../assets/circle.png'

const TicTacToe = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const player1 = queryParams.get('player1');
    const player2 = queryParams.get('player2');
    const [winCount,setWinCount]=useState({ player1: 0, player2: 0 });

  const handleClick = (index) => {
    if (state[index] || calculateWinner(state)||isDraw(state)) {
      return;
    }


    const newState = state.slice();

    newState[index] = isXNext ? 'X' : 'O';
    setState(newState);

    setIsXNext(!isXNext);

    const winner = calculateWinner(newState);
    if (winner) {
      updateWinCount(winner);
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
        if(squares[a]=='X'){
          return player1
        
        }
        else{
          return player2
          
        }
        
      }
    }
    return null;
  };

  

  const isDraw = (squares) => {
    return squares.every((square) => square !== null);
  };


  const updateWinCount = (winner) => {
    setWinCount((prevCount) => ({
      ...prevCount,
      [winner === player1 ? 'player1' : 'player2']: prevCount[winner === player1 ? 'player1' : 'player2'] + 1,
    }));
  };

  const resetGame = () => {
    setState(Array(9).fill(null));
    setIsXNext(true);
    setWinCount({ player1: 0, player2: 0 });
  };

  const playAgain=()=>{
    setState(Array(9).fill(null));
  }

  const winner = calculateWinner(state);
  const status = winner? `Winner is ${winner}`: isDraw(state)? 'It\'s a draw!': `${isXNext ? player1 : player2}'s Turn`;

  return (
    <>
    <Navbar/>
    <div className='container background'>
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
      <button type='none' className="p1win">
        {player1}: {winCount.player1}
      </button>
      <button type='none' className="p2win">
       {player2}: {winCount.player2}
      </button>
      <button className="Pagain" onClick={playAgain}>
       Play Again
      </button>
    </div>
    </>
  );
}
export default TicTacToe;


