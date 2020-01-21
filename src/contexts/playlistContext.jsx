import React, {useState, useEffect} from 'react'
import {playlistReducer} from '../firebase/reducers'

const PlaylistStateContext = React.createContext()
const PlaylistDispatchContext = React.createContext()

function PlaylistProvider({children}) {
  const [state, dispatch] = React.useReducer(playlistReducer, [])
  const [playlists, setPlaylists] = useState(state)

  useEffect(() => {
    resolvePromise(state);
  }, [state])

  const resolvePromise = async (state) => {
    const videos = await state
    setPlaylists(videos)
  }

  return (
    <PlaylistStateContext.Provider value={playlists}>
      <PlaylistDispatchContext.Provider value={dispatch}>
        {children}
      </PlaylistDispatchContext.Provider>
    </PlaylistStateContext.Provider>
  )
}

function usePlaylistState() {
  const context = React.useContext(PlaylistStateContext)
  if (context === undefined) {
    throw new Error('usePlaylistState must be used within a PlaylistProvider')
  }
  return context
}

function usePlaylistDispatch() {
  const context = React.useContext(PlaylistDispatchContext)
  if (context === undefined) {
    throw new Error('usePlaylistDispatch must be used within a PlaylistProvider')
  }
  return context
}

export {PlaylistProvider, usePlaylistState, usePlaylistDispatch}
