import { Drawer } from "@material-ui/core";
import MenuList from "./menuList"
//import { useActiveWeb3React } from "../../hooks/useWeb3";

export default function SideMenu(props: any) {
    //const { active } = useActiveWeb3React()
    const doNothing = () => {}
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
                        WebkitBoxShadow: "10px -5px 10px 0px rgba(0,0,0,0.1)",
                        boxShadow: "10px -5px 10px 0px rgba(0,0,0,0.1)",
                        background: (theme) => theme.palette.mode === "light" ? '#fff' : '#303030' 
                    },
                    display: {
                        xs: "none",
                        md: "block"
                    }
                }} >
                <MenuList changePage={props.changePage} closeDrawer={doNothing}/>
            </Drawer>
        </>
    )
}