import React from 'react'
import TicTacToe from './Component/TicTacToe'
import PlayerSelect from './Component/PlayerSelect'
import Home from './Component/Home'
import Computer from './Component/Computer'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

const App = () => {
  return (  
    <>
  <BrowserRouter>
  <Routes>
    
  <Route>
  <Route path="/" element={<Home/>}  />
        <Route path="/computer" element={<Computer/>} />
        <Route path="/player-select" element={<PlayerSelect/>} />
        <Route path='/tictactoe' element={<TicTacToe/>}/>
        </Route>
  </Routes>
  </BrowserRouter> 
  </>
  )
}

export default App