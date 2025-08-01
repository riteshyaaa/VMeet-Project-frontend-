import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';

import RoomPage from './Pages/RoomPage';

function App() {
  
  return (
    <>
    <Routes>
      <Route path='/'  element={<HomePage/>} />
      <Route path='/room/:roomId' element={<RoomPage/>} />
    </Routes>
     </>
  )
}

export default App
