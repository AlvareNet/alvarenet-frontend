import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { AdminWalletEndpoint, EarningsEndpoint } from "../../constants/misc"

interface AdminPermission {
    allowed: boolean
}

interface EarningsResult {
    balance: string;
    marketing: string;
    itservice: string;
    salary: string;
    exchange: string;
    savings: string;
}

interface EarningsData {
    balance: ethers.BigNumber;
    marketing: ethers.BigNumber;
    itservice: ethers.BigNumber;
    salary: ethers.BigNumber;
    exchange: ethers.BigNumber;
    savings: ethers.BigNumber;
}

function getAdminWallet(address: string): Promise<AdminPermission> {
    return (
        fetch(
            AdminWalletEndpoint + address,
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

function getEarningsData(data: string): Promise<EarningsResult> {
    return (
        fetch(
            EarningsEndpoint + data,
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

export function useAdminAccount(account: string | null | undefined): boolean {
    const [admin, setAdmin] = useState(false);
    useEffect(() => {
        setAdmin(false);
        if (account) {
            getAdminWallet(account).then((result) => setAdmin(result.allowed))
        }
    },
        [account]
    );
    return admin;
}

export function useWalletEarnings(account: string | null | undefined, start: Date | null, stop: Date | null): EarningsData | null {
    const [data, setData] = useState<EarningsData | null>(null);
    useEffect(() => {
        setData(null);
        if (account) {
            var data = "";
            if(start){
                data = data + "&start=" + (start.valueOf()/1000).toString();
            }
            if(stop){
                data = data + "&stop=" + (stop.valueOf()/1000).toString();
            }
            getEarningsData(data).then((result) => 
            {
                var newObject: EarningsData = {
                    marketing : ethers.BigNumber.from(result.marketing),
                    itservice : ethers.BigNumber.from(result.itservice),
                    salary : ethers.BigNumber.from(result.salary),
                    savings : ethers.BigNumber.from(result.savings),
                    exchange : ethers.BigNumber.from(result.exchange),
                    balance : ethers.BigNumber.from(result.balance)
                }
                setData(newObject);
            }
            )
        }
    },
        [account, start, stop]
    );
    return data;
}

