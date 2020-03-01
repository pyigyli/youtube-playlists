import React, {useEffect} from 'react'
import {UserProvider, useUserDispatch} from '../contexts/userContext'
import {PlaylistProvider} from '../contexts/playlistContext'
import './css/App.css'
import Header from './Header/Header'
import VideoLister from './VideoLister'
import {tryAutoLogin} from '../cookies'

const App = () => {

  const setUser = useUserDispatch()

  useEffect(() => {
    tryAutoLogin(setUser)
  }, [])

  return (
    <>
      <Header/>
      <VideoLister/>
    </>
  )
}

const AppWrapper = () => {
  return (
    <UserProvider>
      <PlaylistProvider>
        <App/>
      </PlaylistProvider>
    </UserProvider>
  )
}

export default AppWrapper
