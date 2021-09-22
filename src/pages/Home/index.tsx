import { Grid, Typography } from "@material-ui/core"
import { useWeb3React } from "@web3-react/core"

export default function Home() {
  const { active, account } = useWeb3React()
  return (
    <>
      <Grid container justifyContent="center" boxShadow={2} sx={{
        padding: '30px'
      }}>
        <Grid container item md={12} xs={12}>
          <Grid container item justifyContent="space-around">
            <Typography variant="h5">Home</Typography>
          </Grid>
          <Grid container item md={12} xs={12} justifyContent="center">
            <Typography variant="body1">{active ? account : "Connect your wallet to use all features"}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}