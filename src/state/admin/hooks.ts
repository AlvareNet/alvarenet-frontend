import { useEffect, useState } from "react"
import { AdminWalletEndpoint, EarningsEndpoint } from "../../constants/misc"

interface AdminPermission {
    allowed: boolean
}

interface EarningsData {
    balance: string;
    marketing: string;
    itservice: string;
    salary: string;
    exchange: string;
    savings: string;
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

function getEarningsData(data: string): Promise<EarningsData> {
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

export function useWalletEarnings(account: string | null | undefined, start: number | null, stop: number | null): EarningsData | null {
    const [data, setData] = useState<EarningsData | null>(null);
    useEffect(() => {
        setData(null);
        if (account) {
            var data = "";
            if(start){
                data = data + "?start=" + (start/1000).toString();
            }
            if(stop){
                data = data + "?stop=" + (stop/1000).toString();
            }
            getEarningsData(data).then((result) => setData(result))
        }
    },
        [account]
    );
    return data;
}

