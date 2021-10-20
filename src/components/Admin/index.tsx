import { LocalizationProvider } from "@mui/lab";
import { Button, CircularProgress, Grid, TextField, Typography, Zoom } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAdminAccount, useWalletEarnings } from "../../state/admin/hooks";

import DateAdapter from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { BigNumberToDisplay } from "../../utils";
import format from "date-fns/format";
import enUS from "date-fns/esm/locale/en-US/index.js";

export default function Admin() {
  const { t, i18n } = useTranslation();
  const { account } = useWeb3React();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [stopDate, setStopDate] = useState<Date | null>(null);
  const isAdmin = useAdminAccount(account);
  const EarningsData = useWalletEarnings(account, startDate, stopDate);
  const TimeFrametext = useMemo(() => {
    if (startDate && stopDate) {
      return t('admin.between', { start: format(startDate, 'PPpp', {locale: enUS }), stop: format(stopDate, 'PPpp', {locale: enUS }) })
    }
    else if (startDate) {
      return t('admin.starttime', { date: format(startDate, 'PPpp', {locale: enUS })})
    }
    else if (stopDate) {
      return t('admin.stoptime', { date: format(stopDate, 'PPpp', {locale: enUS }) })
    }
    else {
      return t('admin.alltime')
    }
  }, [startDate, stopDate])

  const reset = () => {
    setStartDate(null);
    setStopDate(null);
  }
  return (
    <>
    {isAdmin &&
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Zoom in={true} timeout={250}>
          <Grid container justifyContent="center" boxShadow={2} sx={{
            padding: '30px'
          }}>
            <Grid container item md={12} xs={12} justifyContent="center" sx={{ padding: '15px' }}>
              <Typography variant="h4" align="center">{t('admin.header')}</Typography>
            </Grid>
            <Grid container item md={12} xs={12} justifyContent="center" sx={{ padding: '15px' }}>
              <Typography variant="h6" align="center">{t('admin.subheader')}</Typography>
            </Grid>

            <Grid container item md={6} xs={12} justifyContent="center" sx={{ padding: '15px' }} >
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label={t('admin.selectstarttime')}
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
              />
            </Grid>

            <Grid container item md={6} xs={12} justifyContent="center" sx={{ padding: '15px' }} >
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label={t('admin.selectstoptime')}
                value={stopDate}
                onChange={(newValue) => {
                  setStopDate(newValue);
                }}
              />
            </Grid>
            { (startDate || stopDate) &&
                        <Grid container item md={12} xs={12} justifyContent="center"  >
                        <Button onClick={() => reset()} variant="contained">{t('admin.reset')}</Button>
                      </Grid>

            }

            {EarningsData ?
              <Grid container justifyContent="center" sx={{ padding: '10px', marginTop: '30px' }}>
                <Grid container item md={6} xs={12} justifyContent="center">
                  <Typography variant="body2">{TimeFrametext}</Typography>
                </Grid>
                <Grid container justifyContent="center" sx={{ padding: '10px' }}>
                  <Grid container item md={6} xs={12} justifyContent="center" sx={{ padding: '10px' }}>
                    <Typography variant="body2">{t('admin.marketing')} : {BigNumberToDisplay(EarningsData.marketing, 18)}</Typography>
                  </Grid>
                  <Grid container item md={6} xs={12} justifyContent="center" sx={{ padding: '10px' }}>
                    <Typography variant="body2">{t('admin.itservice')} : {BigNumberToDisplay(EarningsData.itservice, 18)} {t('home.balance.usd')}</Typography>
                  </Grid>
                  <Grid container item md={6} xs={12} justifyContent="center" sx={{ padding: '10px' }}>
                    <Typography variant="body2">{t('admin.salary')} : {BigNumberToDisplay(EarningsData.salary, 18)} {t('home.balance.usd')}</Typography>
                  </Grid>
                  <Grid container item md={6} xs={12} justifyContent="center" sx={{ padding: '10px' }}>
                    <Typography variant="body2">{t('admin.exchange')} : {BigNumberToDisplay(EarningsData.exchange, 18)} {t('home.balance.usd')}</Typography>
                  </Grid>
                  <Grid container item md={6} xs={12} justifyContent="center" sx={{ padding: '10px' }}>
                    <Typography variant="body2">{t('admin.savings')} : {BigNumberToDisplay(EarningsData.savings, 18)} {t('home.balance.usd')}</Typography>
                  </Grid>
                  <Grid container item md={6} xs={12} justifyContent="center" sx={{ padding: '10px' }}>
                    <Typography variant="body2">{t('admin.balance')} : {BigNumberToDisplay(EarningsData.balance, 18)} {t('home.balance.usd')}</Typography>
                  </Grid>
                </Grid>

              </Grid>
              :
              <Grid container justifyContent="center" sx={{ marginTop: "30px" }}>
                <CircularProgress />
              </Grid>
            }
          </Grid>
        </Zoom>
      </LocalizationProvider>
}
    </>
  )
}