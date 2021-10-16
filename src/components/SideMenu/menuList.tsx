import { List, ListItem, ListItemIcon, ListItemText, Typography, Button, Grid } from "@material-ui/core"
import { Home, SwapHoriz } from "@material-ui/icons"
import { useTranslation } from 'react-i18next';
import PositionedMenu from "./languageDrawer";

export default function MenuList(props: any) {
    const { t, i18n } = useTranslation();
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
                    </List>
                </Grid>
                <Grid container item justifyContent="Center">
                    <PositionedMenu/>
                </Grid>
            </Grid>
        </>
    )
}