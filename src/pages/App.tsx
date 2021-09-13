import './App.css';
import Web3Manager from '../components/Web3Manager';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import styled from 'styled-components';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`

function App() {


  return (
      <Web3Manager>
        <AppWrapper>
        <Header/>
        <SideMenu/>
        </AppWrapper>
      </Web3Manager>
  );
}

export default App;
