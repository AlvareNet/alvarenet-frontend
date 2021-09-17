import { AppBar, Toolbar, Typography, Grid, Box } from "@material-ui/core";
import WalletModal from "../WalletModal";

import banner_light from '../../assets/images/banner_light.png'
import logo from "../../assets/images/logo.svg"

export default function Header() {
  return (
    <>
      <AppBar sx={{
        backgroundColor: "rgba(255,255,255,0.5) !important"
      }}>
        <Toolbar >
          <Grid container justifyContent="space-between" alignContent="center" alignItems="center">
            <Grid item sx={{
              backgroundImage: `url(${logo})`,
              width: '200px',
              height: '50px',
              backgroundSize: 'cover',
              display: {
                xs: 'none',
                md: 'block'
              }
            }} onClick={() => alert("TEST")} />
            <Grid item >
              <WalletModal />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box sx={{
        position: "relative",
        width: "100%",
        marginTop: "-65px",
        height: "290px",
        zIndex: "-1",
        backgroundColor: "#25adba",
        backgroundImage: `url(${banner_light})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}>
      </Box>
    </>
  )
}