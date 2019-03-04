export const addPlaylist = (id) => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		const firestore = getFirestore();
		const playlist = {id: id}
		firestore.collection('playlist').doc(id).set(playlist).then(() => {
			dispatch({type: 'ADD_PLAYLIST', playlist});
		})
	}
}

export const removePlaylist = (id) => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		const firestore = getFirestore();
		const playlist = {id: id}
		firestore.collection('playlist').doc(id).delete().then(() => {
			dispatch({type: 'REMOVE_PLAYLIST', playlist});
		})
	}
}