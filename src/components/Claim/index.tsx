import { Button, Box, Grid, Typography } from "@material-ui/core"
import { useClaimCallback, useUserHasAvailableClaim, useUserUnclaimedAmount } from "../../state/claim/slothi/hooks"
import AlvareNet_Logo from "../../assets/images/AlvareNet_Logo.png"

export default function Claim() {
  const number = useUserUnclaimedAmount()
  const available = useUserHasAvailableClaim()
  const { claimCallback } = useClaimCallback()
  function onClaim() {
    claimCallback().then((result) => console.log(result))
      // reset modal and log error
      .catch((error) => {
        console.log(error)
      })
  }


  if (available) {
    return (
      <Grid container justifyContent="center">
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
          <Button onClick={onClaim}>
          {"Claim " + number.toString()}
        </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  else {
    return (
      <Grid container justifyContent="center">
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
            <Typography variant="h5">No token to claim!</Typography>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
