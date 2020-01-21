import React from 'react'
import {useUserState, useUserDispatch} from '../../contexts/userContext'
import {Button} from '@material-ui/core'
import '../css/Header/LogoutForm.css'

const LogoutForm = () => {
  const user = useUserState()
  const setUser = useUserDispatch()

  const handleLogout = () => {
    setUser({
      type: 'LOGOUT',
      id: user.id
    })
  }

  const hadnleDeleteUser = () => {
    setUser({
      type: 'DELETE',
      id: user.id
    })
  }

	return (
    <div className='logoutFormContainer'>
      <div className='username'>
        {user.username}
      </div>
      <Button
        size='small'
        onClick={handleLogout}
        name='submit'
        style={{
          background: 'hsl(0, 0%, 7%)',
          color: 'white'
        }}
      >
        Logout
      </Button>
      <Button
        size='small'
        onClick={hadnleDeleteUser}
        name='submit'
        style={{
          background: 'hsl(0, 0%, 7%)',
          color: 'white',
          marginLeft: '0.4rem'
        }}
      >
        Delete Account
      </Button>
    </div>
  )
}

export default LogoutForm
