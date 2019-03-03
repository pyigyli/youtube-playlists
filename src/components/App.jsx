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

const styles = (theme) => createStyles({
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
	render() {
		const {classes, onChangeTheme} = this.props;

		return (
			<div className={classes.body}>
				<Header onChangeTheme={onChangeTheme}/>
				<VideoLister/>
			</div>
		);
	}
}

const AppWithProps = withStyles(styles)(App);

class AppWrapper extends React.Component {
	state = {theme: 'dark'};

	changeTheme = (theme) => {
		this.setState({ theme });
	}

	render() {
		return (
			<MuiThemeProvider theme={themes[this.state.theme]}>
				<Provider store={store}>
					<AppWithProps onChangeTheme={this.changeTheme} />
				</Provider>
			</MuiThemeProvider>
		);
	}
}

export default AppWrapper;
