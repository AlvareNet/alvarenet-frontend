import { createTheme, Theme, ThemeOptions } from '@material-ui/core/styles';

export const themeOptions: Theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#1073B7',
      dark: '#1848A0',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});