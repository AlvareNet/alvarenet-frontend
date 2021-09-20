import './App.css';
import Web3Manager from '../components/Web3Manager';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import styled from 'styled-components';
import { CssBaseline } from "@material-ui/core"
import Claim from "../components/Claim";
import Home from "./Home"
import { useState } from "react"

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
  const [page,setPage] = useState<string>("Home")
  function handleChange(newPage: string) {
    setPage(newPage)
  }

  let pageDiv

  switch (page) {
    case "Home":
      pageDiv =  <Home />
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
      <CssBaseline />
      <Web3Manager>
        <AppWrapper>
          <Header changePage={handleChange}/>
          <div>
            <SideMenu page={page} changePage={handleChange}/>
            <Page>
              {pageDiv}
            </Page>
          </div>
        </AppWrapper>
      </Web3Manager>
    </>
  );
}

export default App;
