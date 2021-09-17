import './App.css';
import Web3Manager from '../components/Web3Manager';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import styled from 'styled-components';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Claim from "../components/Claim";

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`

function App() {
  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      <Web3Manager>
        <AppWrapper>
          <Header />
          <div>
            <SideMenu />
            <div style={{
              left: '220px',
              position: 'relative'
            }}>
              <Claim />
            </div>
          </div>
        </AppWrapper>
      </Web3Manager>
    </ThemeProvider>
  );
}

export default App;
