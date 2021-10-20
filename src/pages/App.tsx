import './App.css';
import Web3Manager from '../components/Web3Manager';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import { styled } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import {
  Theme,
  StyledEngineProvider,
  CssBaseline,
  Fab,
  DialogTitle,
  Dialog,
  DialogContent,
  Grid,
} from "@mui/material";
import Claim from "../components/Claim";
import Home from "./Home"
import { useState } from "react"
import lilli from "../assets/images/lilli.jpg"
import { LightMode, DarkMode } from "@mui/icons-material"
import { themeOptionsLight, themeOptionsDark } from '../theme'
import Admin from '../components/Admin';






const AppWrapper = styled('div')`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`
const Page = styled('div')(({ theme }) => ({
  left: '220px',
  position: 'absolute',
  height: 'calc(100% - 225px)',
  width: 'calc(100% - 240px)',
  [theme.breakpoints.down('md')]: {
    left: '0px',
    width: '100%',
    padding: '10px'
  }
}));

function App() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<string>("Home")
  function handleChange(newPage: string) {
    setPage(newPage)
  }

  const [mode, setMode] = useState<Boolean>(false)
  function handleDarkMode() {
    setMode(!mode)
  }

  let pageDiv

  switch (page) {
    case "Home":
      pageDiv = <Home />
      break
    case "Claim":
      pageDiv = <Claim />
      break
    case "Admin":
      pageDiv = <Admin />
      break
    default:
      pageDiv = <Home />
      break
  }

  return <>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={mode ? themeOptionsLight : themeOptionsDark}>
        <CssBaseline />
        <Web3Manager>
          <AppWrapper>
            <Header changePage={handleChange} darkMode={mode}/>
            <div>
              <SideMenu page={page} changePage={handleChange} />
              <Page>
                {pageDiv}
              </Page>
            </div>
            <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: '16px', right: '16px' }} onClick={handleDarkMode}>
              {mode ? <DarkMode /> : <LightMode />}
            </Fab>
          </AppWrapper>
        </Web3Manager>
      </ThemeProvider>
    </StyledEngineProvider>
  </>;
}

export default App;
