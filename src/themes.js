import { createMuiTheme } from '@material-ui/core/styles'
import { merge } from 'lodash'

const commonytpStyles = {
	chat: {messages: {message: {borderRadius: '0.6rem'}}},
	cards: {card: {borderRadius: '0.6rem'}}
};

// Utility function to add common theme options
const createTheme = (opts) => {
	return createMuiTheme(merge(opts, {
		typography: {
			// Needed to not get deprecation warnings in developer console
			useNextVariants: true,
			htmlFontSize: 10,
			fontFamily: 'Montserrat, Helvetica, Arial'
		},
		overrides: {MuiTooltip: {tooltip: {fontWeight: 500}}}
	}));
};

export default {
	light: createTheme({
		ytp: merge(commonytpStyles, {
			text: {
				primary: '#000000de',
				secondary: '#000000de'
			},
			body: {background: '#efefef'},
			header: {
				background: '#efefef',
				input: {
					background: '#ffffffcc'
				},
				button: {
					background: '#3f3f3f'
				}
			}
		})
	}),
	dark: createTheme({
		ytp: merge(commonytpStyles, {
			text: {
				primary: '#ffffffcc',
				secondary: '#999999'
			},
			body: {background: 'hsl(0, 0%, 7%)'},
			header: {
				background: '#3a3a3a',
				input: {
					background: 'hsl(0, 0%, 7%)'
				},
				button: {
					background: '#3f3f3f'
				}
			}
		})
	})
};
