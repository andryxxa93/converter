import { blue, green, grey } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
		main: grey[600]
    },
    background: {
      default: blue[500],
    },
  },
	typography: {
		body1: {
			fontSize: 16,
			fontWeight: 500
		},
		subtitle1: {
			fontSize: 14,
		}
	},
  spacing: 8
});

export default theme;