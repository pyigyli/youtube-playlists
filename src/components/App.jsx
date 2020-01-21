import React from 'react'
import {UserProvider} from '../contexts/userContext'
import {PlaylistProvider} from '../contexts/playlistContext'
import './css/App.css'
import Header from './Header/Header'
import VideoLister from './VideoLister'

const App = () => {
  return (
    <UserProvider>
      <PlaylistProvider>
        <Header/>
        <VideoLister/>
      </PlaylistProvider>
    </UserProvider>
  )
}

export default App
