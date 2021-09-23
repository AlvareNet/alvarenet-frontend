import { AppBar, Toolbar, Typography, Grid, Box, IconButton, Drawer } from "@material-ui/core";
import WalletModal from "../WalletModal";
import { Menu } from "@material-ui/icons"
import banner_light from '../../assets/images/banner_light.png'
import banner_dark from '../../assets/images/banner_black.png'
import logo from "../../assets/images/logo.svg"
import logoDark from "../../assets/images/logo_light.svg"
import { useState } from 'react';
import MenuList from '../SideMenu/menuList'

export default function Header(props: any) {

  const [state, setState] = useState(false)
  const toggleDrawer = (open: any) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };

  return (
    <>
      <AppBar sx={{
        backgroundColor: props.darkMode ? "rgba(255,255,255,0.5) !important" : "rgba(0,0,0,0.5) !important"
      }}>
        <Toolbar >
          <Grid container justifyContent="space-between" alignContent="center" alignItems="center">
            <Grid item sx={{
              backgroundImage: props.darkMode ? `url(${logo})` : `url(${logoDark})`,
              width: '200px',
              height: '50px',
              backgroundSize: 'cover',
              display: {
                xs: 'none',
                md: 'block'
              }
            }} onClick={() => alert("TEST")} />
            <Grid item sx={{
              display: {
                xs: 'block',
                md: 'none'
              }
            }}>
              <IconButton edge="start" color="primary" aria-label="menu" onClick={toggleDrawer(true)}>
                <Menu />
              </IconButton>
            </Grid>
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
        backgroundColor: props.darkMode ? '#fff' : '#303030',
        backgroundImage: props.darkMode ? `url(${banner_light})` : `url(${banner_dark})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}>
        <Box sx={{
          backgroundImage: props.darkMode ? `url(${logo})` : `url(${logoDark})`,
          width: '260px',
          height: '65px',
          backgroundSize: 'cover',
          top: '175px',
          position: 'relative',
          left: '50%',
          transform: 'translate(-50%, 0)',
          display: {
            xs: 'block',
            md: 'none'
          }
        }} ></Box>
      </Box>
      <Drawer
        anchor="bottom"
        open={state}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 'auto' }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <MenuList changePage={props.changePage} />
        </Box>
      </Drawer>
    </>
  )
}