import { Button, Box, Grid, Typography } from "@material-ui/core"
import { useClaimCallback, useUserHasAvailableClaim, useUserUnclaimedAmount } from "../../state/claim/slothi/hooks"
import AlvareNet_Logo from "../../assets/images/AlvareNet_Logo.png"
import NumberFormat from 'react-number-format';
import { useWeb3React } from "@web3-react/core"

export default function Claim() {
  const number = useUserUnclaimedAmount()
  const available = useUserHasAvailableClaim()
  const { claimCallback } = useClaimCallback()
  const amount = number.div(1000000000).toString()
  const { active } = useWeb3React()
  
  function onClaim() {
    claimCallback().then((result) => console.log(result))
      // reset modal and log error
      .catch((error) => {
        console.log(error)
      })
  }


  if (available && active) {
    return (
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
            <NumberFormat
              displayType="text"
              className="foo"
              value={amount.toString()}
              thousandSeparator={true}
              suffix={" ANET available"}
            />
          </Grid>
          <Grid container justifyContent="center" sx={{marginTop: "20px"}}>
            <Button onClick={onClaim} variant="contained">
              {"Claim now"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  else {
    return (
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
            <Typography variant="h5">No token to claim!</Typography>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
