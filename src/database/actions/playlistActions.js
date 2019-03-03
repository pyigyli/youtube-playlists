export const addPlaylist = (id) => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		const firestore = getFirestore();
		const playlist = {id: id}
		firestore.collection('playlist').add(playlist).then(() => {
			dispatch({type: 'ADD_PLAYLIST', playlist});
		})
	}
}