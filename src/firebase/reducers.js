import {createUser, deleteUser, loginUser, logoutUser} from '../firebase/database/users'
import {addPlaylist, getPlaylists, removePlaylist} from '../firebase/database/playlists'

export const userReducer = async (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return await createUser(action.username, action.password)
    case 'DELETE':
      return await deleteUser(action.id)
    case 'LOGIN':
      return await loginUser(action.username, action.password)
    case 'LOGOUT':
      return await logoutUser(action.id)
    default:
      throw new Error('Unknown action type for playlistReducer')
  }
}

export const playlistReducer = async (state, action) => {
  switch (action.type) {
    case 'ADD':
      await addPlaylist(action.user, action.id)
      break
    case 'GET':
      break
    case 'REMOVE':
      await removePlaylist(action.user, action.id)
      break
    default:
      throw new Error('Unknown action type for playlistReducer')
  }
  return await getPlaylists(action.user)
}
