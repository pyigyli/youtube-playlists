import playlistReducer from './playlistReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
	playlist: playlistReducer,
	firestore: firestoreReducer
});

export default rootReducer;