import { List, ListItem, ListItemIcon, ListItemText, Typography, Button, Grid } from "@material-ui/core"
import { Home, SwapHoriz } from "@material-ui/icons"
import { useTranslation, Trans } from 'react-i18next';

export default function MenuList(props: any) {
    const { t, i18n } = useTranslation();

    return (
        <>
            <Grid container direction="column" justifyContent="space-between" sx={{ height: "100%"}} spacing={0}>
                <Grid container item>
                    <Typography variant="h6" color="primary" sx={{
                        padding: '15px',
                    }}>Dashboard</Typography>
                    <List sx={{width: "100%"}}>
                        <ListItem button key={"Home"} onClick={() => props.changePage("Home")}>
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <ListItemText primary={t('sidebar.home')} />
                        </ListItem>
                        <ListItem button key={"Swap"} onClick={() => props.changePage("Claim")}>
                            <ListItemIcon>
                                <SwapHoriz />
                            </ListItemIcon>
                            <ListItemText primary={t('sidebar.swap')} />
                        </ListItem>
                    </List>
                </Grid>
                <Grid container item justifyContent="Center">
                    <div>
                        <Button key="de" onClick={() => i18n.changeLanguage("de")} style={{ fontWeight: i18n.resolvedLanguage === "de" ? 'bold' : 'normal' }}>
                            {t('lang.de')}
                        </Button>|
                        <Button key="en" onClick={() => i18n.changeLanguage("en")} style={{ fontWeight: i18n.resolvedLanguage === "en" ? 'bold' : 'normal' }}>
                            {t('lang.en')}
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}