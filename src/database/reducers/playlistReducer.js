const initState = {}

const playlistReducer = (state = initState, action) => {
	switch (action.type) {
		case 'ADD_PLAYLIST':
			console.log('Playlist subscribed', action.playlist);
			return state;
		case 'REMOVE_PLAYLIST':
			console.log('Playlist unsubscribed', action.playlist);
			return state;
		default:
			return state;
	}
}

export default playlistReducer