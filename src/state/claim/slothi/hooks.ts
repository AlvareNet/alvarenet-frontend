import { useEffect, useState } from "react"
import { isAddress, getAddress } from "@ethersproject/address"
import { useActiveWeb3React, useBlockNumber } from '../../../hooks/useWeb3'
import { CHUNKURLPREFIX, CLAIMMAPPINGURL, SAMARI, SLOTHI, SLOTHI_MERKLE_DISTRIBUTER } from "../../../constants/contracts"
import { useERC20Contract, useMerkleDistributorContract } from "../../../hooks/useContract"
import { BigNumber, ContractTransaction, ethers } from "ethers"

interface UserClaims {
  Slothi? : UserClaimData
  Samari? : UserClaimData
}

interface UserClaimData {
  index: number
  amount: string
  contract: string
  proof: string[]
}

type ClaimAddressMapping = { start: string, stop: string, file: string }
let FETCH_CLAIM_MAPPING_PROMISE: Promise<ClaimAddressMapping[]> | null = null
function fetchClaimMapping(): Promise<ClaimAddressMapping[]> {
  return (
    FETCH_CLAIM_MAPPING_PROMISE ??
    (FETCH_CLAIM_MAPPING_PROMISE = fetch(
      CLAIMMAPPINGURL.TESTNET
    )
      .then((res) => res.json())
      .catch((error) => {
        console.error('Failed to get claims mapping', error)
        FETCH_CLAIM_MAPPING_PROMISE = null
      }))
  )
}

let FETCH_CLAIM_FILE_PROMISE: Promise<{ [address: string]: UserClaimData[] }> | null = null
function fetchClaimFile(key: string): Promise<{ [address: string]: UserClaimData[] }> {
  return (
    FETCH_CLAIM_FILE_PROMISE ??
    (FETCH_CLAIM_FILE_PROMISE = fetch(
      CHUNKURLPREFIX.TESTNET + key
    )
      .then((res) => res.json())
      .catch((error) => {
        console.error(`Failed to get claim file mapping for ${key}`, error)
      }))
  )
}

const FETCH_CLAIM_PROMISES: { [key: string]: Promise<UserClaims> } = {}
// returns the claim for the given address, or null if not valid
function fetchClaim(account: string, chainId: number): Promise<UserClaims> {
  if (!isAddress(account)) {
    return Promise.reject(new Error('Invalid address'))
  }
  const formattedAddress = getAddress(account).toLowerCase()

  return (
    FETCH_CLAIM_PROMISES[account] ??
    (FETCH_CLAIM_PROMISES[account] = fetchClaimMapping()
      .then((mapping) => {
        for (const data of mapping) {
          if (data.start.toLowerCase() <= formattedAddress.toLowerCase() && data.stop.toLowerCase() >= formattedAddress.toLowerCase()) {
            return fetchClaimFile(data.file);
          }
        };
        throw new Error(`Claim for ${formattedAddress} was not found in partial search`)
      })
      .then((result) => {
        if (result[formattedAddress]){
          var data : UserClaims = {}
          result[formattedAddress].forEach(element => {
            if(element.contract.toLowerCase() === SLOTHI[chainId].toLowerCase()){
              data.Slothi = element;
            }
            else if(element.contract.toLowerCase() === SAMARI[chainId].toLowerCase()){
              data.Samari = element;
            }
          });
          return data;
        }
        throw new Error(`Claim for ${formattedAddress} was not found in claim file!`)
      })
      .catch((error) => {
        console.debug('Claim fetch failed', error)
        throw error
      }))
  )
}

// parse distributorContract blob and detect if user has claim data
// null means we know it does not
export function useUserClaimData(): { [account: string]: UserClaims } {
  const { chainId, account } = useActiveWeb3React()
  const [claimInfo, setClaimInfo] = useState<{ [account: string]: UserClaims }>({})

  useEffect(() => {
    if (!account || (chainId !== 56 && chainId !== 97 && chainId !== 1337)) {
      setClaimInfo({})
      return
    }

    fetchClaim(account, chainId)
      .then((accountClaimInfo) =>
        setClaimInfo((claimInfo) => {
          return {
            ...claimInfo,
            [account]: accountClaimInfo,
          }
        })
      )
      .catch(() => {
        setClaimInfo({})
      })
  }, [account, chainId])

  return claimInfo
}

// check if user is in blob and has not yet claimed UNI
export function useUserHasAvailableClaim(): {sama: boolean, slth: boolean} {
  const userClaimData = useUserClaimData()
  const { account, chainId } = useActiveWeb3React()
  const blocknumber = useBlockNumber()

  const [slothiClaim, setSetSlothiClaimInfo] = useState<boolean>(false)
  const [samariClaim, setSetSamariClaimInfo] = useState<boolean>(false)

  const distributorContract = useMerkleDistributorContract(SLOTHI_MERKLE_DISTRIBUTER)
  useEffect(() => {
    if (userClaimData && account && userClaimData[account] && chainId) {
      if(userClaimData[account].Slothi){
        distributorContract?.isClaimedSlothi(account).then(
          (result) => {
            setSetSlothiClaimInfo(!result)
          }
        ); 
      }
      else{
        setSetSlothiClaimInfo(false)
      }
      if(userClaimData[account].Samari){
        distributorContract?.isClaimedSamari(account).then(
          (result) => {
            setSetSamariClaimInfo(!result)
          }
        ); 
      }
      else{
        setSetSamariClaimInfo(false)
      }
    }
  }, [userClaimData, distributorContract, account, chainId, blocknumber]
  )
  // user is in blob and contract marks as unclaimed
  return {slth : slothiClaim, sama: samariClaim};
}

// check if user is in blob and has not yet claimed UNI
export function useUserUnclaimedAmount(): {slth: BigNumber, sama: BigNumber} {
  const userClaimData = useUserClaimData()
  const { account, chainId} = useActiveWeb3React()

  const [SlothiClaimAmount, setSlothiClaimAmount] = useState<BigNumber>(BigNumber.from("0"))
  const [SamariClaimAmount, setSamariClaimAmount] = useState<BigNumber>(BigNumber.from("0"))

  const distributorContracts = useMerkleDistributorContract(SLOTHI_MERKLE_DISTRIBUTER)
  useEffect(() => {
    if (userClaimData && account && userClaimData[account] && chainId) {
      var element = userClaimData[account]
      if(element.Slothi){
        distributorContracts?.getBalance(element.Slothi.amount).then((result) => {
          setSlothiClaimAmount(BigNumber.from(result))
        }) 
      }
      else{
        setSlothiClaimAmount(BigNumber.from("0"))
      }
      if(element.Samari){
        distributorContracts?.getBalanceSamari(element.Samari.amount).then((result) => {
          setSamariClaimAmount(BigNumber.from(result))
        })
      }
      else{
        setSamariClaimAmount(BigNumber.from("0"))
      }
    }
  }, [userClaimData, distributorContracts, chainId, account]
  )
  // user is in blob and contract marks as unclaimed
  return {slth : SlothiClaimAmount, sama: SamariClaimAmount};
}

export function useApproved(): {slth: boolean, sama: boolean} {
  const userClaimData = useUserClaimData();
  const claimAvailable = useUserHasAvailableClaim();
  const { account, chainId} = useActiveWeb3React();
  const blocknumber = useBlockNumber();

  const [oldAccount, setCurrentAccount] = useState<string>();
  const [SlothiApproved, setSlothiApproved] = useState<boolean>(false)
  const [SamariApproved, setSamariApproved] = useState<boolean>(false)

  const slothiContract = useERC20Contract(SLOTHI)
  const samariContract = useERC20Contract(SAMARI)
  useEffect(() => {
    if (userClaimData && account && userClaimData[account] && chainId) {
      if(oldAccount != account){
        setSlothiApproved(false);
        setSamariApproved(false);
        setCurrentAccount(account);
      }
      var element = userClaimData[account]
      if(element.Slothi?.amount && claimAvailable.slth && !SlothiApproved){
        let amount = element.Slothi.amount
        let success = false
        slothiContract?.allowance(account, SLOTHI_MERKLE_DISTRIBUTER[chainId]).then((result) => {
          if(result.gte(amount)){
            success = true;
          }
        }) 
        setSlothiApproved(success)
      }
      if(element.Samari?.amount && claimAvailable.sama && !SamariApproved){
        let amount = element.Samari.amount
        let success = false
        samariContract?.allowance(account, SLOTHI_MERKLE_DISTRIBUTER[chainId]).then((result) => {
          if(result.gte(amount)){
            success = true
          }
        })
        setSamariApproved(success)
       
    }
  }
  else{
    setSlothiApproved(false);
    setSamariApproved(false);
  }
}, [userClaimData, samariContract, slothiContract, chainId, account, blocknumber, claimAvailable.sama, claimAvailable.slth, SamariApproved, SlothiApproved]
  )
  // user is in blob and contract marks as unclaimed
  return {slth : SlothiApproved, sama: SamariApproved};
}

export function useApproveCallback(): {
  SlthApproveCallback: () => Promise<ContractTransaction | null>,
  SamaApproveCallback: () => Promise<ContractTransaction | null>
}{
  const { library, chainId, account } = useActiveWeb3React()
  const available = useUserHasAvailableClaim()
  const approved = useApproved()

  const slthContract = useERC20Contract(SLOTHI)
  const samaContract = useERC20Contract(SAMARI)
  const  SlthApproveCallback = async function () {
    if (!account ||!available.slth || !library || !chainId || !slthContract || approved.slth) return null


    const args = [SLOTHI_MERKLE_DISTRIBUTER[chainId], ethers.constants.MaxUint256] as const
    return slthContract
      .approve(...args)
      .then((response) => {
        return response
      })
  }
  const  SamaApproveCallback = async function () {
    if (!account ||!available.sama || !library || !chainId || !samaContract || approved.sama) return null

    const args = [SLOTHI_MERKLE_DISTRIBUTER[chainId], ethers.constants.MaxUint256] as const
    return samaContract
      .approve(...args)
      .then((response) => {
        return response
      })
  }

  return { SlthApproveCallback, SamaApproveCallback}

}

export function useClaimCallback(): {
  SlthClaimCallback: () => Promise<ContractTransaction| null>,
  SamaClaimCallback: () => Promise<ContractTransaction| null>
} {
  // get claim data for this account
  const { library, chainId, account } = useActiveWeb3React()
  const claimData = useUserClaimData()
  const available = useUserHasAvailableClaim()
  const approved = useApproved()

  // used for popup summary
  const distributorContract = useMerkleDistributorContract(SLOTHI_MERKLE_DISTRIBUTER)

  const SlthClaimCallback = async function () {

    if (!claimData || !account || !claimData[account] || !available.slth || !library || !chainId || !distributorContract || !approved.slth) return null
    var element = claimData[account]
    if (!element.Slothi) return null
    const args = [element.Slothi.index, account, element.Slothi.amount, element.Slothi.contract ,element.Slothi.proof] as const

    return distributorContract
      .claim(...args)
      .then((response) => {
        return response
      })
  }

  const SamaClaimCallback = async function () {

    if (!claimData || !account || !claimData[account] || !available.sama || !library || !chainId || !distributorContract || !approved.sama) return null
    var element = claimData[account]
    if (!element.Samari) return null
    const args = [element.Samari.index, account, element.Samari.amount, element.Samari.contract ,element.Samari.proof] as const

    return distributorContract
      .claim(...args)
      .then((response) => {
        return response
      })
  }

  return { SlthClaimCallback, SamaClaimCallback }
}
