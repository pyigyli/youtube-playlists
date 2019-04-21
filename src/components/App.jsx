import React from 'react'
import { MuiThemeProvider, createStyles, withStyles } from '@material-ui/core'
import themes from '../themes'
import Header from './Header'
import VideoLister from './VideoLister'
import { createStore, applyMiddleware, compose } from 'redux'
import rootRedurec from '../database/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import firebaseConfig from '../database/apiConfig'

const styles = theme => createStyles({
	body: {
		background: theme.ytp.body.background,
		width: '100%',
		height: '100%',
		overflow: 'auto'
	}
});

const store = createStore(
		rootRedurec,
		compose(
			applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
			reduxFirestore(firebaseConfig),
			reactReduxFirebase(firebaseConfig)
		)
	);

class App extends React.Component {
	state = {updateId: ''}

	updatePlaylist = id => this.setState({updateId: id});

	onUpdate = () => this.setState({updateId: ''});

	render() {
		const {classes} = this.props;
		const {updateId} = this.state;

		return (
			<div className={classes.body}>
				<Header
					updatePlaylist={this.updatePlaylist}
				/>
				<VideoLister
					updateId={updateId}
					onUpdate={this.onUpdate}
				/>
			</div>
		);
	}
}

const AppWithProps = withStyles(styles)(App);

class AppWrapper extends React.Component {
	state = {theme: 'dark'};

	render() {
		return (
			<MuiThemeProvider theme={themes[this.state.theme]}>
				<Provider store={store}>
					<AppWithProps/>
				</Provider>
			</MuiThemeProvider>
		);
	}
}

export default AppWrapper;
