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
				secondary: '#585858de',
				unsubscribeLink: '#ad0000',
				unsubscribeLinkHover: '#ee0000'
			},
			body: {background: '#efefef'},
			header: {
				background: '#ffffff',
				input: {
					background: '#efefef'
				},
				button: {
					background: '#ffffffff'
				}
			}
		})
	}),
	dark: createTheme({
		ytp: merge(commonytpStyles, {
			text: {
				primary: '#ffffffcc',
				secondary: '#999999',
				unsubscribeLink: '#ad0000',
				unsubscribeLinkHover: '#ee0000'
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
