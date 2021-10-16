import { Grid, Typography, Zoom } from "@material-ui/core"
import { color } from "@material-ui/system";
import { useWeb3React } from "@web3-react/core"
import { useTranslation } from 'react-i18next';
import TokenStats from "../../components/TokenStats";

export default function Home() {
  const { active, account } = useWeb3React()
  const { t } = useTranslation();
  return (
    <>
      <Zoom in={true} timeout={250}>
        <Grid container justifyContent="center" boxShadow={4} sx={{ 
          padding: '30px', 
          zIndex: (theme) => theme.zIndex.appBar - 1, 
          borderRadius: '5px',
          WebkitBoxShadow: "0px 0px 10px -1px rgba(0,0,0,0.75)",
          boxShadow: "0px 0px 10px -1px rgba(0,0,0,0.75)"
          }} >

          <Grid container item md={12} xs={12} justifyContent="center">
            <Typography variant="h4" align="center">{t('home.welcome.title')}</Typography>
          </Grid>

          <Grid container item md={12} xs={12} justifyContent="center" sx={{ padding: '30px' }} >
            <Typography variant="body2" align="center">{active ? t('home.welcome.wallet',{wallet: account}) : t('home.welcome.walletConnectInfo')}</Typography>
          </Grid>

          <TokenStats/>

        </Grid>
      </Zoom>
    </>
  )
}