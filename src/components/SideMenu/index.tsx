import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Home, SwapHoriz } from "@material-ui/icons";

export default function SideMenu() {
    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    zIndex: (theme) => theme.zIndex.appBar - 1,
                    flexShrink: 0,
                    ['.MuiDrawer-paper']: {
                        width: '200px !important',
                        height: 'calc(100% - 200px)',
                        marginTop: '200px',
                        borderTop: '1px solid rgba(0,0,0,0.12)',
                        borderTopRightRadius: '25px',
                        WebkitBoxShadow: "10px -5px 10px 0px rgba(0,0,0,0.1)",
                        boxShadow: "10px -5px 10px 0px rgba(0,0,0,0.1)",
                    }
                }} >
                <Box>
                    <List>
                        <ListItem button key={"Home"}>
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <ListItemText primary={"Home"} />
                        </ListItem>
                        <ListItem button key={"Swap"}>
                            <ListItemIcon>
                                <SwapHoriz />
                            </ListItemIcon>
                            <ListItemText primary={"Swap"} />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    )
}