import React from 'react'
import { YoutubeApiKey } from '../database/apiConfig'
import { createStyles, withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { removePlaylist } from '../database/actions/playlistActions'

const styles = theme => createStyles({
	videoListContainer: {
		background: theme.ytp.body.background,
		color: theme.ytp.text.primary,
		paddingTop: '1rem',
		paddingLeft: '2rem',
		display: 'flex',
		flexDirection: 'row',
	},
	videoInfoContainer: {
		padding: '1rem',
		display: 'flex',
		flexDirection: 'column'
	},
	videoTitle: {
		color: theme.ytp.text.primary,
		textDecoration: 'none',
		fontSize: '1.4rem',
		fontWeight: 400,
		lineHeight: '2.4rem'
	},
	videoAuthor: {
		color: theme.ytp.text.secondary,
		textDecoration: 'none',
		paddingTop: '0.5rem',
		'&:hover': {
			color: theme.ytp.text.primary
		}
	},
	videoDescription: {
		color: theme.ytp.text.secondary,
		textDecoration: 'none',
		paddingTop: '1rem'
	},
	unsubscribeLink: {
		color: theme.ytp.text.unsubscribeLink,
		textDecoration: 'none',
		paddingTop: '0.5rem',
		'&:hover': {
			cursor: 'pointer',
			color: theme.ytp.text.unsubscribeLinkHover,
		}
	}
});

class VideoLister extends React.Component {
	state = {videos: []}

	componentDidUpdate = prevProps => {
		if (this.props.playlists && this.props.playlists !== prevProps.playlists) {
			const {YoutubeDataAPI} = require('youtube-v3-api');
			const api = new YoutubeDataAPI(YoutubeApiKey);
			Object.values(this.props.playlists).forEach(playlist => {
				api.searchPlaylistItems(playlist.id, 20, {part: 'snippet'}).then(data => {
					data.items.forEach(video => this.setState({videos: [...this.state.videos, video]}));
				});
			});
		}
		if (this.props.updateId && this.props.updateId !== prevProps.updateId) {
			this.props.onUpdate();
			const {YoutubeDataAPI} = require('youtube-v3-api');
			const api = new YoutubeDataAPI(YoutubeApiKey);
			api.searchPlaylistItems(this.props.updateId, 20, {part: 'snippet'}).then(data => {
				data.items.forEach(video => this.setState({videos: [...this.state.videos, video]}));
			});
		}
	}

	removePlaylist = event => {
		this.props.removePlaylist(event.target.id);
		const videos = this.state.videos.filter(video => video.snippet.playlistId !== event.target.id);
		this.setState({videos: videos});
	}

	render() {
		const {classes} = this.props;
		const {videos} = this.state;

		if (videos.length > 1) {
			videos.sort((a, b) => {
				if (a.snippet.publishedAt < b.snippet.publishedAt) return 1;
				if (a.snippet.publishedAt > b.snippet.publishedAt) return -1;
				return 0;
			});
		}
		
		return (
			<div>
				{videos && videos.map((video, index) => {
					return (
						<div className={classes.videoListContainer} key={index}>
							<a href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}>
								<img src={video.snippet.thumbnails.medium.url} width={246} height={138} alt=""/>
							</a>
							<div className={classes.videoInfoContainer}>
								<a className={classes.videoTitle} href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}>
									{video.snippet.title}
								</a>
								<a className={classes.videoAuthor} href={`https://www.youtube.com/channel/${video.snippet.channelId}`}>
									{video.snippet.channelTitle}
								</a>
								<a className={classes.videoDescription} href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}>
									{video.snippet.description.split('\n')[0]}
								</a>
								<p
									className={classes.unsubscribeLink}
									id={video.snippet.playlistId}
									onClick={event => this.removePlaylist(event)}
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
}

const mapStateToProps = state => {return {playlists: state.firestore.ordered.playlist}}

const mapDispatchToProps = dispatch => {return {removePlaylist: id => dispatch(removePlaylist(id))}}

export default compose(
	withStyles(styles),
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([{collection: 'playlist'}])
)(VideoLister);