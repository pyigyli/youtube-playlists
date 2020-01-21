import React, {useEffect} from 'react'
import {useUserState} from '../../contexts/userContext'
import {usePlaylistDispatch} from '../../contexts/playlistContext'
import '../css/Header/Header.css'
import SubscriptionForm from './SubscribtionForm'
import LoginForm from './LoginForm'

const Header = () => {
  const user = useUserState()
  const setPlaylists = usePlaylistDispatch()

  useEffect(() => {
    if (user) {
      setPlaylists({
        type: 'GET',
        user
      })
    }
  }, [user])
  
	return (
    <div className='headerContainer'>
      {user && user.username ? <SubscriptionForm/> : <LoginForm/>}
    </div>
  )
}

export default Header
