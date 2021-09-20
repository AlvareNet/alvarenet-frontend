import { Box, Drawer } from "@material-ui/core";
import MenuList from "./menuList"

export default function SideMenu(props: any) {

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
                    },
                    display: {
                        xs: "none",
                        md: "block"
                    }
                }} >
                <Box>
                    <MenuList changePage={props.changePage}/>
                </Box>
            </Drawer>
        </>
    )
}