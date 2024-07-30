import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Displayed from './components/Displayed'
import { PlayerContexted } from './context/PlayerContexed'




const App = () => {

  const {audioRef,track} = useContext(PlayerContexted)

  
  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex'>
       <Sidebar />
       <Displayed />
      
      </div>
      <Player />
      <audio ref={audioRef} src={track.file}   preload='auto'></audio>
    
    </div>
  )
}

export default App
