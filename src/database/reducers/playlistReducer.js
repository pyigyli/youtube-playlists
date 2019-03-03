const initState = {}

const playlistReducer = (state = initState, action) => {
	switch (action.type) {
		case 'ADD_PLAYLIST':
			console.log('playlist added', action.playlist);
			return state;
		default:
			return state;
	}
}

export default playlistReducer