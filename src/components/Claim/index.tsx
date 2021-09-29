import { Button, Box, Grid, Typography, CircularProgress, Zoom } from "@material-ui/core"
import { useApproveCallback, useApproved, useClaimCallback, useUserHasAvailableClaim, useUserUnclaimedAmount } from "../../state/claim/slothi/hooks"
import AlvareNet_Logo from "../../assets/images/AlvareNet_Logo.png"
import ANET from "../../assets/images/ANET.png"
import NumberFormat from 'react-number-format';
import { useWeb3React } from "@web3-react/core"
import { useTranslation } from 'react-i18next';

export default function Claim() {
  const { t } = useTranslation();
  const number = useUserUnclaimedAmount()
  const available = useUserHasAvailableClaim()
  const approved = useApproved()
  const { SlthClaimCallback, SamaClaimCallback } = useClaimCallback()
  const { SlthApproveCallback, SamaApproveCallback} = useApproveCallback()
  const { active } = useWeb3React()

  function slthApprove() {
    SlthApproveCallback().then((result) => result?.wait(1).then((result) => console.log(result)))
      // reset modal and log error
      .catch((error) => {
        console.log(error)
      })
  }

  function slthClaim() {
    SlthClaimCallback().then((result) => console.log(result))
      // reset modal and log error
      .catch((error) => {
        console.log(error)
      })
  }

  if (active && available === null) {
    return (
      <Zoom in={true} timeout={250}>
        <Grid container justifyContent="center" boxShadow={2} sx={{
          padding: '30px'
        }}>
          <Grid item md={12} xs={12}>
            <Grid container justifyContent="center">
              <CircularProgress />
            </Grid>
          </Grid>
        </Grid>
      </Zoom>
    )
  }
  else if (available.slth && active) {
    let button;
    if(approved.slth){
      button =<Button onClick={slthClaim} variant="contained">{t('claim.now')}</Button>
    }
    else{
      button = <Button onClick={slthApprove} variant="contained">{t('claim.approve')}</Button>
    }
    return (
      <Zoom in={true} timeout={250}>
        <Grid container justifyContent="center" boxShadow={2} sx={{
          padding: '30px'
        }}>
          <Grid item md={12} xs={12}>
            <Grid container justifyContent="space-around">
              <Grid item md={12} sx={{
                backgroundImage: `url(${ANET})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '600px',
                height: '300px'
              }}>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} xs={12}>
            <Grid container justifyContent="center">
              <NumberFormat
                displayType="text"
                value={number.slth.div(1000000000).toString()}
                thousandSeparator={true}
                suffix={t('claim.suffix')}
              />
            </Grid>
            <Grid container justifyContent="center" sx={{ marginTop: "20px" }}>
            {button}
            </Grid>
          </Grid>
        </Grid>
      </Zoom>
    );
  }
  else {
    return (
      <Zoom in={true} timeout={250}>
        <Grid container justifyContent="center" boxShadow={2} sx={{
          padding: '30px'
        }}>
          <Grid item md={12} xs={12}>
            <Grid container justifyContent="space-around">
              <Grid item md={12} sx={{
                backgroundImage: `url(${AlvareNet_Logo})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '200px',
                height: '200px'
              }}>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} xs={12}>
            <Grid container justifyContent="center">
              <Typography variant="h5">{t('claim.connectWallet')}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Zoom>
    )
  }
}
