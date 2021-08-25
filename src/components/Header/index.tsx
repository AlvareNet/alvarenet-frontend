import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../../pages/logo.svg"
import WalletModal from "../WalletModal";


export default function Header() {
    return (
        <>
           <Navbar bg="light" variant="light">
               <Container>
                    <Navbar.Brand>
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />{' '}
                        AlvareNET
                    </Navbar.Brand>
                    <Nav>
                        <WalletModal></WalletModal>
                    </Nav>
               </Container>
           </Navbar>
       </>
    )
}