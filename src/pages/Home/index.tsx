import { Grid, Typography, Zoom } from "@mui/material"
import { useTranslation } from 'react-i18next';
import TokenStats from "../../components/TokenStats";

export default function Home() {
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

          <TokenStats />
        </Grid>
      </Zoom>
    </>
  )
}