import React from 'react';

const Square = ({ value, onClick }) => {
  return (
    <div className="boxes" onClick={onClick}>
      {value && <div className="values">{value}</div>}
    </div>
  );
};

export default Square;