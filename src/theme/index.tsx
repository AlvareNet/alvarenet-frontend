import { createTheme, Theme, ThemeOptions } from '@material-ui/core/styles';

export const themeOptionsLight: Theme = createTheme( {
  palette: {
    mode: "light",
    background: {
      default: "#fff"
    },
    primary: {
      main: "#0F73B7",
    }
  },
});

export const themeOptionsDark: Theme = createTheme( {
  palette: {
    mode: "dark", 
    background: {
      default: "#303030"
    },
    primary: {
      main: "#0F73B7",
    }
  }
});