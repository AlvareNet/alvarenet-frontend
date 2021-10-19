import { formatUnits } from "@ethersproject/units";
import { Button, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { borderBottom, textAlign } from "@material-ui/system";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { commify } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useBalance, useReflection, usePrice } from "../../state/tokenstats/hooks";
import { BigNumberToDisplay } from "../../utils";

const negativesix = 1000000;
const negative15 = 1000000000000000;



export default function TokenStats() {
  const { t } = useTranslation();
  const { account, active } = useWeb3React();
  const [account_string, setaccount] = useState<string | null | undefined>(null);
  const [account_input, setaccountinput] = useState<string>("");
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [helpertext, setHelperText] = useState("");
  const [lookup, setLookup] = useState(false);


  useEffect(() => {
    if (account) {
      setaccount(account);
      setaccountinput("");
      setIsFormInvalid(false);
      setHelperText("");
      setLookup(false);
    }
  }, [account]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value;
    setaccountinput(input);

    if (ethers.utils.isAddress(input)) {
      setIsFormInvalid(false);
      setaccount(input.toLowerCase());
      setHelperText("");
      setLookup(true);
    }
    else if (input === "") {
      setIsFormInvalid(false);

    }
    else {
      setIsFormInvalid(true);
      setHelperText("Not a valid address!");
    }


  };

  const reset = () => {
    setaccount(account);
    setaccountinput("");
    setIsFormInvalid(false);
    setHelperText("");
    setLookup(false);
  }

  const balance = useBalance(account_string);
  const balancePrice = usePrice(account_string, balance);
  const reflection = useReflection(account_string);
  const reflectionPrice = usePrice(account_string, reflection);
  var reflectionString = BigNumberToDisplay(reflection, 9);
  var balanceString = BigNumberToDisplay(balance, 9);
  var reflectionPriceString = BigNumberToDisplay(reflectionPrice, 18);
  var balancePriceString = BigNumberToDisplay(balancePrice, 18);
  return (
    <>
      <Grid container item md={12} xs={12} justifyContent="center" sx={{ padding: '30px' }} >
        <Typography variant="body2" align="center">{active ? t('home.welcome.wallet', { wallet: account }) : t('home.welcome.walletConnectInfo')}</Typography>
      </Grid>

      <Grid container item md={12} xs={12} justifyContent="center" sx={{  padding: '15px'}} >
        <TextField
          id="walletInput"
          style = {{textAlign: 'center' }}
          sx = {{maxWidth: '500px'}}
          inputProps={{style: { textAlign: 'center' }}} 
          placeholder="Look up a wallet"
          value={account_input}
          onChange={handleChange}
          error={isFormInvalid}
          helperText={helpertext}
          variant="outlined"
          fullWidth
        />
      </Grid>
      { lookup &&
      <>
      <Grid container item md={12} xs={12} justifyContent="center"  >
        <Button onClick={() => reset()} variant="contained">{t('home.balance.reset')}</Button>
      </Grid>
      <Grid container item md={12} xs={12} justifyContent="center" sx={{ padding: '15px' }} >
        <Typography variant="body2" align="center">{t('home.balance.forwallet', { wallet: account_string })}</Typography>
      </Grid>
      </>
      }
      <Grid container justifyContent="center" sx={{ padding: '10px' }}>

        {account_string &&
          <>
            <Grid container justifyContent="center" sx={{ padding: '10px' }}>

              <Grid container item md={6} xs={12} justifyContent="center">
                <Typography variant="body2">{t('home.balance.total')} : {balanceString}</Typography>
              </Grid>

              <Grid container item md={6} xs={12} justifyContent="center">
                <Typography variant="body2">{t('home.balance.totalvalue')} : {balancePriceString} {t('home.balance.usd')}</Typography>
              </Grid>

            </Grid>
            <Grid container justifyContent="center" sx={{ padding: '10px' }}>
              <Grid container item md={6} xs={12} justifyContent="center">
                <Typography variant="body2">{t('home.balance.reflection')} : {reflectionString}</Typography>
              </Grid>

              <Grid container item md={6} xs={12} justifyContent="center">
                <Typography variant="body2">{t('home.balance.reflectionvalue')} : {reflectionPriceString} {t('home.balance.usd')}</Typography>
              </Grid>
            </Grid>
          </>
        }
      </Grid>
    </>
  )
}