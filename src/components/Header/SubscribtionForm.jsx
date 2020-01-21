import React, {useState} from 'react'
import {useUserState} from '../../contexts/userContext'
import {usePlaylistDispatch} from '../../contexts/playlistContext'
import {InputBase, InputAdornment, Button} from '@material-ui/core'
import '../css/Header/SubscriptionForm.css'
import LogoutForm from './LogoutForm'

const SubscriptionForm = () => {
  const [input, setInput] = useState('')
  
  const user = useUserState()
  const setPlaylist = usePlaylistDispatch()

	const handleClickSubmit = () => {
		if (input.length === 34 || input.length === 24) { // Check to confirm it is a playlist ID
			setPlaylist({
        type: 'ADD',
        user,
        id: input
      })
		}
	}

	const handleEnterKey = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault()
			event.stopPropagation()
			handleClickSubmit()
		}
  }

	return (
    <div className='subscribeFormContainer'>
      <InputBase
        className='input'
        placeholder='Playlist ID'
        onKeyDown={handleEnterKey}
        value={input}
        onChange={({target}) => setInput(target.value)}
        style={{color: 'white'}}
        endAdornment={
          <InputAdornment position='end'>
            <Button
              size='small'
              onClick={handleClickSubmit}
              name='submit'
              style={{
                background: '#3a3a3a',
                color: 'white',
                padding: '0.4rem',
                marginTop: '0.2rem'
              }}
            >
              Add
            </Button>
          </InputAdornment>
        }
      />
      <LogoutForm/>
    </div>
  )
}

export default SubscriptionForm
