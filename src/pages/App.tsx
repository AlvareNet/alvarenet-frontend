import './App.css';
import Web3Manager from '../components/Web3Manager';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import styled from 'styled-components';
import { ThemeProvider, CssBaseline, Fab } from "@material-ui/core"
import Claim from "../components/Claim";
import Home from "./Home"
import { useState, useEffect } from "react"
import { LightMode, DarkMode } from "@material-ui/icons"
import { themeOptionsLight, themeOptionsDark } from '../theme'
import { createTheme } from '@material-ui/core/styles';

const AppWrapper = styled.div`
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
  const [page, setPage] = useState<string>("Home")
  function handleChange(newPage: string) {
    setPage(newPage)
  }

  const [mode, setMode] = useState<Boolean>(false)
  function handleDarkMode() {
    setMode(!mode)
    console.log(mode)
  }

  let pageDiv

  switch (page) {
    case "Home":
      pageDiv = <Home />
      break
    case "Claim":
      pageDiv = <Claim />
      break
    default:
      pageDiv = <Home />
      break
  }

  return (
    <>
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
            <Fab color="primary" aria-label="add" sx={{ position: 'absolute', bottom: '16px', right: '16px' }} onClick={handleDarkMode}>
              {mode ? <DarkMode /> : <LightMode />}
            </Fab>
          </AppWrapper>
        </Web3Manager>
      </ThemeProvider>
    </>
  );
}

export default App;
