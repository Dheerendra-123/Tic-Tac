import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="return_home" onClick={handleClick}>
      Home
    </div>
  );
};

export default Navbar;