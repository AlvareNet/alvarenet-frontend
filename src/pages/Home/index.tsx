import { Grid, Typography, Zoom } from "@material-ui/core"
import { useWeb3React } from "@web3-react/core"
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { active, account } = useWeb3React()
  const { t } = useTranslation();
  return (
    <>
      <Zoom in={true} timeout={250}>
        <Grid container justifyContent="center" boxShadow={2} sx={{ padding: '30px' }}>

          <Grid container item md={12} xs={12} justifyContent="space-around">
            <Typography variant="h5">Home</Typography>
          </Grid>

          <Grid container item md={6} xs={12} justifyContent="center">
            <Typography variant="body2">{t('home.welcome.title')}</Typography>
          </Grid>
          <Grid container item md={6} xs={12} justifyContent="center">
            <Typography variant="body2">{active ? account : t('home.welcome.walletConnectInfo')}</Typography>
          </Grid>
        </Grid>
      </Zoom>
    </>
  )
}