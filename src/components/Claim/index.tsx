import { Button, Grid, Typography, CircularProgress, Zoom, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import { useApproveCallback, useApproved, useClaimCallback, useUserClaimData, useUserHasAvailableClaim, useUserUnclaimedAmount } from "../../state/claim/hooks"
import AlvareNet_Logo from "../../assets/images/AlvareNet_Logo.png"
import ANET from "../../assets/images/ANET.png"
import SAMA from "../../assets/images/SAMA.png"
import NumberFormat from 'react-number-format';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction, useState } from "react";
import { ContractTransaction } from "@ethersproject/contracts";
import { useActiveWeb3React } from "../../hooks/useWeb3";
import { useWeb3React } from "@web3-react/core";
import { BigNumberToDisplay } from "../../utils"

export default function Claim() {
  const { t } = useTranslation();
  const dataAvailable = useUserClaimData();
  const number = useUserUnclaimedAmount()
  const available = useUserHasAvailableClaim()
  const Amountapproved = useApproved()
  const { SlthClaimCallback, SamaClaimCallback } = useClaimCallback()
  const { SlthApproveCallback, SamaApproveCallback } = useApproveCallback()
  const { active } = useWeb3React()
  const [slthinTX, setslthinTX] = useState(false);
  const [samainTX, setsamainTX] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errormessage, setErrorMessage] = useState("");

  //TODO: insert SAMA swap logo

  function TransactionCallback(callback: () => Promise<ContractTransaction | null>, stateSetter: Dispatch<SetStateAction<boolean>>) {
    stateSetter(true)
    callback().then((result) => {
      return result?.wait(1)
    }).then((result) => {
      console.log(result)
    })
      // reset modal and log error
      .catch((error) => {
        //Insert modal showing error message!
        let message = t('claim.tokenssold');

        setErrorMessage(message);
        setOpenErrorDialog(true);
        console.log(error)
      }).finally(() => stateSetter(false))
    
  }

  function closeErrorDialog(){
    setOpenErrorDialog(false);
    setErrorMessage("");
  }

  return (
    <>
      <Dialog
        open={openErrorDialog}
        onClose={closeErrorDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"An error occured"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errormessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeErrorDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    <Zoom in={true} timeout={250}>
      <Grid container justifyContent="center" boxShadow={2} sx={{
        padding: '30px'
      }}>
        {active ? 
        <>
          {available.slth && active && <>
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
                  value={BigNumberToDisplay(number.slth, 9)}
                  thousandSeparator={true}
                  suffix={t('claim.suffix')}
                />
              </Grid>
              <Grid container justifyContent="center" sx={{ marginTop: "20px" }}>
                {slthinTX ? (
                  <CircularProgress />
                ) :
                  Amountapproved.slth ?
                    <Button onClick={() => TransactionCallback(SlthClaimCallback, setslthinTX)} variant="contained">{t('claim.now')}</Button> :
                    <Button onClick={() => TransactionCallback(SlthApproveCallback, setslthinTX)} variant="contained">{t('claim.approve')}</Button>
                }
              </Grid>
            </Grid>
          </>
          }
          {available.sama && active &&
            <>
              <Grid item md={12} xs={12}>
                <Grid container justifyContent="space-around">
                  <Grid item md={12} sx={{
                    backgroundImage: `url(${SAMA})`,
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
                    value={BigNumberToDisplay(number.sama, 9)}
                    thousandSeparator={true}
                    suffix={t('claim.suffix')}
                  />
                </Grid>
                <Grid container justifyContent="center" sx={{ marginTop: "20px" }}>
                  {samainTX ? (
                    <CircularProgress />
                  ) :
                    Amountapproved.sama ? (
                      <Button onClick={() => TransactionCallback(SamaClaimCallback, setsamainTX)} variant="contained">{t('claim.now')}</Button>) :
                      (<Button onClick={() => TransactionCallback(SamaApproveCallback, setsamainTX)} variant="contained">{t('claim.approve')}</Button>)
                  }
                </Grid>
              </Grid>
            </>
          }
          {active && !available.slth && !available.sama && (!dataAvailable || (!dataAvailable.Samari && !dataAvailable.Slothi)) &&
            <Grid item md={12} xs={12}>
              <Grid container justifyContent="center">
                <Typography variant="body1" align="center">{t('claim.nothing')}</Typography>
              </Grid>
            </Grid>
          }
          {active && !available.slth && !available.sama && dataAvailable && (dataAvailable.Slothi || dataAvailable.Samari) &&
            <Grid item md={12} xs={12}>
              <Grid container justifyContent="center">
                <Typography variant="body1" align="center">{t('claim.already')}</Typography>
              </Grid>
            </Grid>
          }
        </>
          :
          <>
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
          </>
        }
      </Grid>
    </Zoom>
    </>
  );
}
