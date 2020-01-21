import db from '../init'

export const addPlaylist = async (user, id) => {
  try {
    const findDuplicate = await db.ref(`users/${user.id}/playlists`).orderByKey().equalTo(id).once('value')
    if (findDuplicate.toJSON()) {
      console.log('Playlist already in subscriptions.')
      return false
    }
    db.ref(`users/${user.id}/playlists/${id}`).set(id)
    return true
  } catch (err) {
    console.log('Unable to reach database.')
    console.error(err)
  }
}

export const getPlaylists = async (user) => {
  try {
    const playlistsSnapshot = await db.ref(`users/${user.id}/playlists`).once('value')
    if (!playlistsSnapshot.toJSON()) {
      return []
    }
    const playlists = Object.keys(playlistsSnapshot.toJSON())
    const {YoutubeDataAPI} = require('youtube-v3-api')
    const api = new YoutubeDataAPI('AIzaSyBqg21TLE8kgduVhlR5I8waHocnHdHzawY')
    const videos = []
    while (playlists.length > 0) {
      const id = playlists.pop()
      const data = await api.searchPlaylistItems(id, 20, {part: 'snippet'})
      data.items.forEach(video => {
        videos.push(video)
      })
    }
    return videos
  } catch (err) {
    console.log('Unable to reach database.')
    console.error(err)
  }
}

export const removePlaylist = async (user, id) => {
  try {
    await db.ref(`users/${user.id}/playlists/${id}`).remove()
  } catch (err) {
    console.log('Unable to reach database.')
    console.error(err)
  }
}
