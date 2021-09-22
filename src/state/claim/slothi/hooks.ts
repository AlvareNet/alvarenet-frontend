import { useEffect, useState } from "react"
import { isAddress, getAddress} from "@ethersproject/address"
import { useActiveWeb3React } from '../../../hooks/useWeb3'
import { SLOTHI_MERKLE_DISTRIBUTER } from "../../../constants/contracts"
import { useMerkleDistributorContract } from "../../../hooks/useContract"
import { BigNumber } from "ethers"

interface UserClaimData {
  index: number
  amount: string
  proof: string[]
}

type ClaimAddressMapping = { start: string, stop: string, file: string }
let FETCH_CLAIM_MAPPING_PROMISE: Promise<ClaimAddressMapping[]> | null = null
function fetchClaimMapping(): Promise<ClaimAddressMapping[]> {
  return (
    FETCH_CLAIM_MAPPING_PROMISE ??
    (FETCH_CLAIM_MAPPING_PROMISE = fetch(
      `https://raw.githubusercontent.com/AlvareNet/AirdropData/main/output/slothi/mappings.json`
    )
      .then((res) => res.json())
      .catch((error) => {
        console.error('Failed to get claims mapping', error)
        FETCH_CLAIM_MAPPING_PROMISE = null
      }))
  )
}

let FETCH_CLAIM_FILE_PROMISE: Promise<{ [address: string]: UserClaimData }> | null = null
function fetchClaimFile(key: string): Promise<{ [address: string]: UserClaimData }> {
  return (
    FETCH_CLAIM_FILE_PROMISE ??
    (FETCH_CLAIM_FILE_PROMISE = fetch(
      `https://raw.githubusercontent.com/AlvareNet/AirdropData/main/output/slothi/${key}`
    )
      .then((res) => res.json())
      .catch((error) => {
        console.error(`Failed to get claim file mapping for ${key}`, error)
      }))
  )
}

const FETCH_CLAIM_PROMISES: { [key: string]: Promise<UserClaimData> } = {}
// returns the claim for the given address, or null if not valid
function fetchClaim(account: string): Promise<UserClaimData> {
  if(!isAddress(account)){
    return Promise.reject(new Error('Invalid address'))
  }
  const formatted = getAddress(account).toLowerCase()

  return (
    FETCH_CLAIM_PROMISES[account] ??
    (FETCH_CLAIM_PROMISES[account] = fetchClaimMapping()
      .then((mapping) => {
        for (const data of mapping) {
          if(data.start.toLowerCase() <= formatted.toLowerCase() && data.stop.toLowerCase() >= formatted.toLowerCase()){
            return fetchClaimFile(data.file);
          }
        };
        throw new Error(`Claim for ${formatted} was not found in partial search`)
      })
      .then((result) => {
        if (result[formatted]) return result[formatted]
        throw new Error(`Claim for ${formatted} was not found in claim file!`)
      })
      .catch((error) => {
        console.debug('Claim fetch failed', error)
        throw error
      }))
  )
}

// parse distributorContract blob and detect if user has claim data
// null means we know it does not
export function useUserClaimData(): [UserClaimData | null, string | null] | null {
  const { chainId, account } = useActiveWeb3React()

  const [claimInfo, setClaimInfo] = useState<{ [account: string]: UserClaimData | null }>({})
  
  useEffect(() => {
    if (!account || (chainId !== 56 && chainId !== 97 && chainId !== 1337)) return

    fetchClaim(account)
      .then((accountClaimInfo) =>
        setClaimInfo((claimInfo) => {
          return {
            ...claimInfo,
            [account]: accountClaimInfo,
          }
        })
      )
      .catch(() => {
        setClaimInfo((claimInfo) => {
          return {
            ...claimInfo,
            [account]: null,
          }
        })
      })
  }, [account, chainId])

  return account && (chainId === 56 || chainId === 97 || chainId === 1337) ? [claimInfo[account], account] : null
}

// check if user is in blob and has not yet claimed UNI
export function useUserHasAvailableClaim(): boolean {
  const userClaimData = useUserClaimData()

  const [claimData, setClaimInfo] = useState<boolean>(false)

  const distributorContracts = useMerkleDistributorContract(SLOTHI_MERKLE_DISTRIBUTER)
  useEffect(() => {
  if(userClaimData && userClaimData[1] && userClaimData[0]){
    distributorContracts?.isClaimed(userClaimData[1]).then(
      (result) => {
        setClaimInfo(!result)
      }
    );

  }}, [userClaimData]
  )
  // user is in blob and contract marks as unclaimed
  return claimData;
}

// check if user is in blob and has not yet claimed UNI
export function useUserUnclaimedAmount(): BigNumber {
  const userClaimData = useUserClaimData()

  const [claimAmount, setClaimAmount] = useState<BigNumber>(BigNumber.from("0"))

  const distributorContracts = useMerkleDistributorContract(SLOTHI_MERKLE_DISTRIBUTER)
  useEffect(() =>{
  if(userClaimData && userClaimData[1] && userClaimData[0]){
    distributorContracts?.getBalance(userClaimData[0].amount).then((result) =>{
      setClaimAmount(BigNumber.from(result))
    }
    )

  }}, [userClaimData]
  )
  // user is in blob and contract marks as unclaimed
  return claimAmount;
}

export function useClaimCallback(): {
  claimCallback: () => Promise<string>
} {
  // get claim data for this account
  const { library, chainId, account } = useActiveWeb3React()
  const claimData = useUserClaimData()

  // used for popup summary
  const unclaimedAmount: BigNumber | undefined = useUserUnclaimedAmount()
  const distributorContract = useMerkleDistributorContract(SLOTHI_MERKLE_DISTRIBUTER)

  const claimCallback = async function () {
    if (!claimData || !claimData[0] || !claimData[1] || !account || !library || !chainId || !distributorContract) return ""

    const args = [claimData[0].index, account, claimData[0].amount, claimData[0].proof] as const

      return distributorContract
        .claim(...args)
        .then((response) => {
          return response.hash
        })
  }

  return { claimCallback }
}
