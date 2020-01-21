import React, {useState, useEffect} from 'react'
import {userReducer} from '../firebase/reducers'

const UserStateContext = React.createContext()
const UserDispatchContext = React.createContext()

function UserProvider({children}) {
  const [state, dispatch] = React.useReducer(userReducer, null)
  const [user, setUser] = useState(state)

  useEffect(() => {
    resolvePromise(state);
  }, [state])

  const resolvePromise = async (state) => {
    const user = await state
    setUser(user)
  }

  return (
    <UserStateContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

function useUserState() {
  const context = React.useContext(UserStateContext)
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider')
  }
  return context
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext)
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider')
  }
  return context
}

export {UserProvider, useUserState, useUserDispatch}
