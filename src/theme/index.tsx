import { createTheme, Theme } from '@mui/material/styles';

export const themeOptionsLight: Theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#fff"
    },
    primary: {
      main: "#0F73B7",
    }
  },
  typography: {
    fontFamily: ['"Roboto','"Black Ops One"','"Open Sans'].join(',')
  },
  
});

export const themeOptionsDark: Theme = createTheme(({
  palette: {
    mode: "dark", 
    background: {
      default: "#303030"
    },
    primary: {
      main: "#0F73B7",
    }
  },
  typography: {
    fontFamily: ['"Roboto','"Black Ops One"','"Open Sans'].join(',')
  },
}));