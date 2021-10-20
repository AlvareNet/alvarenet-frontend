import { List, ListItem, ListItemIcon, ListItemText, Typography, Button, Grid } from "@mui/material"
import { Home, SwapHoriz, AdminPanelSettings } from "@mui/icons-material"
import { useTranslation } from 'react-i18next';
import PositionedMenu from "./languageDrawer";
import { useWeb3React } from "@web3-react/core";
import { useAdminAccount } from "../../state/admin/hooks";

export default function MenuList(props: any) {
    const { t, i18n } = useTranslation();
    const {account} = useWeb3React();
    const isAdmin = useAdminAccount(account);
    return (
        <>
            <Grid container direction="column" justifyContent="space-between"  sx={{ height: "100%", }} spacing={0}>
                <Grid container item>
                    <Typography variant="h6" color="primary" textAlign="center" sx={{
                        padding: '15px',
                        width: "100%"
                    }}>Dashboard</Typography>
                    <List sx={{width: "100%"}} >
                        <ListItem button key={"Home"} onClick={() => {props.changePage("Home"); props.closeDrawer(false)}}>
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <ListItemText primary={t('sidebar.home')} />
                        </ListItem>
                        <ListItem button key={"Swap"} onClick={() => {props.changePage("Claim"); props.closeDrawer(false)}}>
                            <ListItemIcon>
                                <SwapHoriz />
                            </ListItemIcon>
                            <ListItemText primary={t('sidebar.swap')} />
                        </ListItem>
                        {isAdmin &&
                        <ListItem button key={"Admin"} onClick={() => {props.changePage("Admin"); props.closeDrawer(false)}}>
                            <ListItemIcon>
                                <AdminPanelSettings />
                            </ListItemIcon>
                            <ListItemText primary={t('sidebar.admin')} />
                        </ListItem>
}
                    </List>
                </Grid>
                <Grid container item justifyContent="Center">
                    <PositionedMenu/>
                </Grid>
            </Grid>
        </>
    )
}