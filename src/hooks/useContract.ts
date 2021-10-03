import { ERC20__factory, IMerkleDistributer__factory } from '../contracts'
import { Contract } from '@ethersproject/contracts'
import { Signer } from 'ethers'
import { JsonRpcSigner, Provider, Web3Provider } from '@ethersproject/providers'
import { AddressZero } from '@ethersproject/constants'
import { useActiveWeb3React } from './useWeb3'
import { useMemo } from 'react'
import { isAddress } from '@ethersproject/address'

function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
    return library.getSigner(account).connectUnchecked()
}

export function useContract<T extends Contract>(
    ContractAddress: string | { [chainId: number]: string } | undefined, 
    connector: (address: string, signerOrProvider: Signer | Provider) => T, 
    signerPossible: boolean): T | null {
        const { library, account, chainId } = useActiveWeb3React()
        return useMemo(() => {
            if (!ContractAddress || !connector || !library || !chainId) return null
            let address: string | undefined
            if (typeof ContractAddress === 'string') address = ContractAddress
            else address = ContractAddress[chainId]
            if (!address) return null
            if (!isAddress(address) || address === AddressZero) {
                throw Error(`Invalid 'address' parameter '${address}'.`)
            }
            try {
              return connector(address, signerPossible && account ? getSigner(library, account) : library)
            } catch (error) {
              console.error('Failed to get contract', error)
              return null
            }
          }, [ContractAddress, library, chainId, signerPossible, account, connector]) as T
}

export function useMerkleDistributorContract(contract: { [chainId: number]: string }){
    return useContract(contract, IMerkleDistributer__factory.connect, true)
}

export function useERC20Contract(contract: { [chainId: number]: string }){
  return useContract(contract, ERC20__factory.connect, true)
}