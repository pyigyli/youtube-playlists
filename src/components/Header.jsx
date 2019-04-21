import React from 'react'
import { createStyles, withStyles, InputBase, InputAdornment, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { addPlaylist } from '../database/actions/playlistActions'

const styles = theme => createStyles({
	headerContainer: {
		background: theme.ytp.header.background,
		color: theme.ytp.text.primary,
		width: '100%',
		alignItems: 'center',
	},
	formContainer: {
		padding: '0.5rem'
	},
	input: {
		background: theme.ytp.header.input.background,
		color: theme.ytp.text.primary,
		padding: '0.4rem',
		borderRadius: '0.5rem',
		minWidth: '44rem',
		'& button': {
			background: theme.ytp.header.button.background,
			color: theme.ytp.text.primary
		}
	}
});

class Header extends React.Component {
	state = {input: ''}

	handleClickSubmit = () => {
		if (this.state.input.length === 34 || this.state.input.length === 24) {
			this.props.addPlaylist(this.state.input);
			this.props.updatePlaylist(this.state.input);
		}
	}

	handleKeyDown = event => {
		if (event.key === 'Enter') {
			event.preventDefault();
			event.stopPropagation();
			this.handleClickSubmit();
		}
	}

	handleInputChange = event => this.setState({input: event.target.value});

	render() {
		const {classes} = this.props;

		return (
			<div className={classes.headerContainer}>
				<div className={classes.formContainer}>
					<InputBase
						className={classes.input}
						placeholder='Playlist ID'
						onKeyDown={this.handleKeyDown}
						value={this.state.input}
						onChange={this.handleInputChange}
						classes={{focused: classes.focused}}
						endAdornment={
							<InputAdornment position="end">
								<Button size="small" onClick={this.handleClickSubmit} name="submit">
									Add
								</Button>
							</InputAdornment>
						}
					/>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {addPlaylist: id => dispatch(addPlaylist(id))}
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(Header));