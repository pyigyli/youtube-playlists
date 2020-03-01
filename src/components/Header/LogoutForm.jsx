import React, {useState} from 'react'
import {useUserState, useUserDispatch} from '../../contexts/userContext'
import {Button, Switch} from '@material-ui/core'
import '../css/Header/LogoutForm.css'
import {rememberLogin, isAutoLoginSet, forgetLogin} from '../../cookies'

const LogoutForm = () => {
  const [rememberMe, setRememberMe] = useState(isAutoLoginSet() ? true : false)

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

  const toggleCookies = ({target}) => {
    if (target.checked) {
      rememberLogin(user.username)
    } else {
      forgetLogin()
    }
    setRememberMe(target.checked)
  }

	return (
    <div className='logoutFormContainer'>
      <div className='username'>
        {user.username}
      </div>
      <div className='keepLogged'>
        keep me logged in
      </div>
      <Switch
        checked={rememberMe}
        onChange={toggleCookies}
      />
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
