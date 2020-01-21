import React, {useState} from 'react'
import {useUserDispatch} from '../../contexts/userContext'
import '../css/Header/LoginForm.css'
import {InputBase, Button} from '@material-ui/core'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const setUser = useUserDispatch()

  const handleLogin = () => {
    if (username.length > 0 && password.length > 0) {
      setUser({
        type: 'LOGIN',
        username,
        password
      })
    }
  }

	const handleEnterKey = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault()
			event.stopPropagation()
			handleLogin()
		}
  }
  
  const handleCreateUser = () => {
    if (username.length > 0 && password.length > 0) {
      setUser({
        type: 'CREATE',
        username,
        password
      })
    }
  }

  return (
    <div className='loginFormContainer'>
      <InputBase
        className='input'
        placeholder='Username'
        onKeyDown={handleEnterKey}
        value={username}
        onChange={({target}) => setUsername(target.value)}
        style={{color: 'white'}}
      />
      <InputBase
        className='input'
        placeholder='Password'
        onKeyDown={handleEnterKey}
        value={password}
        onChange={({target}) => setPassword(target.value)}
        style={{color: 'white'}}
      />
      <Button
        className='button'
        size='small'
        onClick={handleLogin}
        name='submit'
      >
        Login
      </Button>
      <Button
        className='button'
        size='small'
        onClick={handleCreateUser}
        name='submit'
      >
        Create Account
      </Button>
    </div>
  )
}

export default LoginForm