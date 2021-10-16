import { formatUnits } from "@ethersproject/units";
import { Grid, Typography } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { commify } from "ethers/lib/utils";
import { useTranslation } from "react-i18next";
import { useBalance, useReflection, usePrice } from "../../state/tokenstats/hooks";

const negativesix = 1000000;
const negative15 = 1000000000000000;

export default function TokenStats() {
    const { t } = useTranslation();
    const { account } = useWeb3React();
    const balance = useBalance(account);
    const reflection = useReflection(account);
    const reflectionPrice = usePrice(account, reflection);
    const balancePrice = usePrice(account, balance);
    var reflectionString = commify(formatUnits(reflection.div(negativesix), 3));
    var balanceString = commify(formatUnits(balance.div(negativesix), 3));
    var reflectionPriceString = commify(formatUnits(reflectionPrice.div(negative15), 3));
    var balancePriceString = commify(formatUnits(balancePrice.div(negative15), 3));
    return (
        <>
           { account &&
            <>
            <Grid container justifyContent="center" sx={{ padding: '30px' }}>

            <Grid container item md={6} xs={12} justifyContent="center">
              <Typography variant="body2">{t('home.balance.total')} : {balanceString} {t('home.balance.usd')}</Typography>
            </Grid>
    
            <Grid container item md={6} xs={12} justifyContent="center">
              <Typography variant="body2">{t('home.balance.totalvalue')} : {balancePriceString} {t('home.balance.usd')}</Typography>
            </Grid>
    
            </Grid>
            <Grid container justifyContent="center" sx={{ padding: '30px' }}>
            <Grid container item md={6} xs={12} justifyContent="center">
            <Typography variant="body2">{t('home.balance.reflection')} : {reflectionString} {t('home.balance.usd')}</Typography>
            </Grid>

            <Grid container item md={6} xs={12} justifyContent="center">
            <Typography variant="body2">{t('home.balance.reflectionvalue')} : {reflectionPriceString} {t('home.balance.usd')}</Typography>
            </Grid>
            </Grid>
            </>
           }
        </>
    )
}