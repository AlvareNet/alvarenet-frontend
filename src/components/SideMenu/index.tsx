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
                        height: 'calc(100% - 224px)',
                        marginTop: '224px',
                        
                        borderTopRightRadius: '5px',
                        WebkitBoxShadow: "0px 0px 10px -1px rgba(0,0,0,0.75)",
                        boxShadow: "0px 0px 10px -1px rgba(0,0,0,0.75)",
                        borderRight: '0px',
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