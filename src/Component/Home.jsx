import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div className="outer">
      <div className='head_container'>
        <h1 className='m_heading'>Tic Tac Toe</h1>
      </div>
      <h1>
        <span className='X'>X</span> <span className='O'>O</span>
      </h1>
      
      <div className="button" onClick={() => navigate('/computer')}>
        Play With Computer
      </div>
      
      <div className="button" onClick={() => navigate('/player-select')}>
        Play With Human
      </div>
    </div>
  );
};

export default Home;