import { AppBar, Box, Drawer } from "@material-ui/core";

export default function SideMenu(){
    return  (
        <>
        <Box sx={{ display: 'flex' }}>
            <Drawer variant="permanent" sx={{ 
                zIndex: (theme) => theme.zIndex.appBar - 1,
                flexShrink: 0 }} >
             "Test"   
            </Drawer>
        </Box>
        </>
    )
}