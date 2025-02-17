import React from 'react'

const Square = (props) => {
  return (
    <div onClick={props.onClick} className='boxes'>
      <div className='values'>{props.value}</div>
    </div>
  )
}

export default Square