import React from 'react'
import {useUserState} from '../contexts/userContext'
import {usePlaylistState, usePlaylistDispatch} from '../contexts/playlistContext'
import './css/VideoLister.css'

function VideoLister() {
  const user = useUserState()
  const videos = usePlaylistState()
  const setPlaylists = usePlaylistDispatch()

  if (!user) {
    return null
  }

	const removePlaylist = ({target}) => {
		setPlaylists({
      type: 'REMOVE',
      user,
      id: target.id
    })
	}

  if (videos.length > 1) {
    videos.sort((a, b) => {
      if (a.snippet.publishedAt < b.snippet.publishedAt) return 1
      if (a.snippet.publishedAt > b.snippet.publishedAt) return -1
      return 0
    })
  }
  
  return (
    <div>
      {videos && videos.map((video, index) => {
        return (
          <div className='videoListContainer' key={index}>
            <a href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}>
              <img src={video.snippet.thumbnails.medium.url} width={246} height={138} alt=""/>
            </a>
            <div className='videoInfoContainer'>
              <a className='videoTitle' href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}>
                {video.snippet.title}
              </a>
              <a className='videoAuthor' href={`https://www.youtube.com/channel/${video.snippet.channelId}`}>
                {video.snippet.channelTitle}
              </a>
              <a className='videoDescription' href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}>
                {video.snippet.description.split('\n')[0]}
              </a>
              <p
                className='unsubscribeLink'
                id={video.snippet.playlistId}
                onClick={event => removePlaylist(event)}
              >
                Unsubscribe
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default VideoLister
