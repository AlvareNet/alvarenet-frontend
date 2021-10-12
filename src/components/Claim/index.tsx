import { Button, Grid, Typography, CircularProgress, Zoom } from "@material-ui/core"
import { useApproveCallback, useApproved, useClaimCallback, useUserHasAvailableClaim, useUserUnclaimedAmount } from "../../state/claim/hooks"
import AlvareNet_Logo from "../../assets/images/AlvareNet_Logo.png"
import ANET from "../../assets/images/ANET.png"
import SAMA from "../../assets/images/SAMA.png"
import NumberFormat from 'react-number-format';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction, useState } from "react";
import { ContractTransaction } from "@ethersproject/contracts";
import { useActiveWeb3React } from "../../hooks/useWeb3";
import { useWeb3React } from "@web3-react/core";

export default function Claim() {
  const { t } = useTranslation();
  const number = useUserUnclaimedAmount()
  const available = useUserHasAvailableClaim()
  const Amountapproved = useApproved()
  const { SlthClaimCallback, SamaClaimCallback } = useClaimCallback()
  const { SlthApproveCallback, SamaApproveCallback } = useApproveCallback()
  const { active } = useWeb3React()
  const [slthinTX, setslthinTX] = useState(false);
  const [samainTX, setsamainTX] = useState(false);

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
        console.log(error)
      }).finally(() => stateSetter(false))
    
  }

  return (
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
                  value={number.slth.div(1000000000).toString()}
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
                    value={number.sama.div(1000000000).toString()}
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
          {active && !available.slth && !available.sama &&
            <Grid item md={12} xs={12}>
              <Grid container justifyContent="center">
                <Typography variant="body1" align="center">{t('claim.nothing')}</Typography>
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
  );
}
