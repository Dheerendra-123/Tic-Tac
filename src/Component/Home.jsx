import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="outer">
        <h1 className='m_heading'>Tic Tac Toe Game</h1>
        <h1> <span className='X'>X</span> <span className='O'>O</span></h1>
        <Link to='/'></Link>
        <Link to="/computer">
        <div className="button">Play With Computer</div>
      </Link>
      <Link to="/player-select">
        <div className="button">Play With Human</div>
      </Link>

    </div>
  )
}

export default Home




