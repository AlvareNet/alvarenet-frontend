import { Box, Drawer, Button } from "@material-ui/core";
import { Home, SwapHoriz } from "@material-ui/icons";
import MenuList from "./menuList"
import { useWeb3React } from "@web3-react/core"

export default function SideMenu(props: any) {
    const { active } = useWeb3React()

    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    zIndex: (theme) => theme.zIndex.appBar - 1,
                    flexShrink: 0,
                    ['.MuiDrawer-paper']: {
                        width: '200px !important',
                        height: 'calc(100% - 220px)',
                        marginTop: '220px',
                        borderTop: '1px solid rgba(0,0,0,0.12)',
                        borderTopRightRadius: '25px',
                        WebkitBoxShadow: ((active) ? "10px -5px 10px 0px rgba(0,255,0,0.1)" : "10px -5px 10px 0px rgba(255,0,0,0.1)"),
                        boxShadow: ((active) ? "10px -5px 10px 0px rgba(0,255,0,0.1)" : "10px -5px 10px 0px rgba(255,0,0,0.1)"),
                    },
                    display: {
                        xs: "none",
                        md: "block"
                    }
                }} >
                <Box>
                    <MenuList changePage={props.changePage} />
                </Box>
            </Drawer>
        </>
    )
}