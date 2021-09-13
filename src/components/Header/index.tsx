import { AppBar, Slide, Toolbar, Typography, useScrollTrigger } from "@material-ui/core";
import logo from "../../pages/logo.svg"
import WalletModal from "../WalletModal";
import Claim from "../Claim";


function HideOnScroll(props: { children: any; window: any; }) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

export default function Header(props: any) {
    return (
        <HideOnScroll {...props}>
           <AppBar>
               <Toolbar>
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />{' '}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        AlvareNET
                    </Typography>
                    <WalletModal/>
                    <Claim/>
               </Toolbar>
           </AppBar>
        </HideOnScroll>

    )
}