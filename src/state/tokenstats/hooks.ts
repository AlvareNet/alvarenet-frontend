import { BigNumber } from "@ethersproject/bignumber";
import { useEffect, useState } from "react";
import { ALVARENET, LIQUIDITY } from "../../constants/contracts";
import { ReflectionEndPoint } from "../../constants/misc";
import { useERC20Contract, useLiquidityContract } from "../../hooks/useContract";
import { useBlockNumber } from "../../hooks/useWeb3";


interface ReflectionData {
    wallet: string;
    balance: string;
}

function getReflectionData(address: string): Promise<ReflectionData> {
    return (
        fetch(
            ReflectionEndPoint + address,
        ).then(
            (result) => {
                return result.json()
            }
        ).catch((error) => {
            console.log(error)
        }
        )
    )
}

function useWalletData(account: string | null | undefined): ReflectionData | null {
    const [data, setData] = useState<ReflectionData | null>(null);
    useEffect(() => {
        setData(null);
        if (account) {
            getReflectionData(account).then((result) => setData(result))
        }
    },
        [account]
    );
    return data;
}

export function useReflection(account: string | null | undefined) {
    const walletData = useWalletData(account);
    const balance = useBalance(account);

    const [reflectionAmount, setReflectionAmount] = useState(BigNumber.from(0));
    useEffect(() => {
        setReflectionAmount(BigNumber.from(0))
        if (walletData && walletData.balance && account) {
            let transferBalance = BigNumber.from(walletData.balance);
            setReflectionAmount(balance.sub(transferBalance));
        }
    },
        [account, balance, walletData])
    return reflectionAmount
}

export function useBalance(account: string | null | undefined) {
    const alvareContract = useERC20Contract(ALVARENET);
    const [balanceAmount, setBalanceAmount] = useState(BigNumber.from(0));
    const blocknumber = useBlockNumber();
    useEffect(() => {
        setBalanceAmount(BigNumber.from(0))
        if (alvareContract && account) {
            alvareContract.balanceOf(account).then((result) => { setBalanceAmount(result) })
        }
    },
        [account, alvareContract, blocknumber])
    return balanceAmount;
}

export function usePrice(account: string | null | undefined, amount: BigNumber) {
    const LiquidityContract = useLiquidityContract(LIQUIDITY);
    const [price, setPrice] = useState(BigNumber.from(0));
    const blocknumber = useBlockNumber();
    useEffect(
        () => {
            setPrice(BigNumber.from(0))
            if (!amount.isZero() && !amount.isNegative() && account && LiquidityContract) {
                LiquidityContract.getReserves().then(
                    (result) => {
                        let alvarebalance = result[0];
                        let busdbalance = result[1];
                        //Use pancakeswap calculations
                        let amountwithFee = amount.mul(9975);
                        let numerator = amountwithFee.mul(busdbalance);
                        let denominator = alvarebalance.mul(10000).add(amount);
                        setPrice(numerator.div(denominator));
                    }
                )
            }
        },
        [account, LiquidityContract, amount, blocknumber]
    )
    return price;

}