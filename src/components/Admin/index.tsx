import { formatUnits } from "@ethersproject/units";
import { Button, Grid, makeStyles, TextField, Typography, Zoom } from "@material-ui/core";
import { borderBottom, textAlign } from "@material-ui/system";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { commify } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAdminAccount, useWalletEarnings } from "../../state/admin/hooks";
import { useBalance, useReflection, usePrice } from "../../state/tokenstats/hooks";

const negativesix = 1000000;
const negative15 = 1000000000000000;



export default function Admin() {
  const { t } = useTranslation();
  const { account, active } = useWeb3React();
  const [startDate, setStartDate] = useState<number | null>(null);
  const [stopDate, setStopDate] = useState<number | null>(null);
  const isAdmin = useAdminAccount(account);
  const EarningsData = useWalletEarnings(account, stopDate, startDate);

  const reset = () => {
    setStartDate(null);
    setStopDate(null);
  }
  return (
    <>
    </>
  )
}