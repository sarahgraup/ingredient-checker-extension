import { Theme, createTheme } from '@mui/material';
import { ThemeOptions } from '@mui/material/styles';
// import "./fonts/Syne-Regular.ttf";


export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#292929',
      light: '#ebb78a',
      dark: '#ef5326',
    },
    secondary: {
      main: '#e9c9ad',
      light: '#ebb78a',
    },
    background: {
      default: '#e9e9d7',
    },
    text: {
      primary: '#292929',
    },
  },
  typography: {
    fontFamily: '\'Syne\', Poppins, Arial, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    button: {
      fontWeight: 800,
    },
    h1: {
      fontWeight: 800,
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          background: '#e9c9ad',
          border: 0,
          borderRadius: 5,
          color: 'white',
          height: 48,
          padding: '30px 30px',
          margin:'5%'
        },
      },
    },
  },
};