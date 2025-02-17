import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const PlayerSelect = () => {
    const [player1,setPlayer1]=useState('');
    const [player2,setPlayer2]=useState('');
  return (
    <div className="outer">
        <h1> <span className='X'>X</span> <span className='O'>O</span></h1>
        
        <div className='input_field'>
            <div>
                <input type="text" placeholder='Enter Player 1 Name' value={player1} onChange={(e)=>setPlayer1(e.target.value)}/>   
            </div>
            <div>
                <input type="text" placeholder='Enter Player 2 Name' value={player2} onChange={(e)=>setPlayer2(e.target.value)}/>
            </div>
        </div>
        <Link to={`/tictactoe?player1=${encodeURIComponent(player1)}&player2=${encodeURIComponent(player2)}`}>
                <div className="button">
                    Start Game        
                </div>
            </Link> 
    </div>
  )
}

export default PlayerSelect