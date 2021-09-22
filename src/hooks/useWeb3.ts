import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'

import { injected } from '../connectors'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { Web3Provider } from '@ethersproject/providers'
import { NetworkContextName } from '../constants/misc'

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> {
  const context = useWeb3React<Web3Provider>()
  const contextNetwork = useWeb3React<Web3Provider>(NetworkContextName)
  return context.active ? context : contextNetwork
}

export function useEagerConnect() {
    const { activate, active } = useWeb3React()
    const [tried, setTried] = useState(false)

    useEffect(() => {
        injected.isAuthorized().then((isAuthorized: boolean) => {
          if (isAuthorized) {
            setTried(true)
            //activate(injected, undefined, true).catch(() => {
            //  setTried(true)
            //})
          } else {
            setTried(true)
          }
        })
      }, [activate, active]) // intentionally only running on mount (make sure it's only mounted once :))
    
      // if the connection worked, wait until we get confirmation of that to flip the flag
      useEffect(() => {
        if (!tried && active) {
          setTried(true)
        }
      }, [tried, active])
    
      return tried

}

export function useInactiveListener(suppress: boolean = false) {
    const { active, error, activate } = useWeb3React()
  
    useEffect((): any => {
      const { ethereum } = window as any
      if (ethereum && ethereum.on && !active && !error && !suppress) {
        const handleConnect = () => {
          console.log("Handling 'connect' event")
          activate(injected)
        }
        const handleChainChanged = (chainId: string | number) => {
          console.log("Handling 'chainChanged' event with payload", chainId)
          activate(injected)
        }
        const handleAccountsChanged = (accounts: string[]) => {
          console.log("Handling 'accountsChanged' event with payload", accounts)
          if (accounts.length > 0) {
            activate(injected)
          }
        }
        const handleNetworkChanged = (networkId: string | number) => {
          console.log("Handling 'networkChanged' event with payload", networkId)
          activate(injected)
        }
  
        ethereum.on('connect', handleConnect)
        ethereum.on('chainChanged', handleChainChanged)
        ethereum.on('accountsChanged', handleAccountsChanged)
        ethereum.on('networkChanged', handleNetworkChanged)
  
        return () => {
          if (ethereum.removeListener) {
            ethereum.removeListener('connect', handleConnect)
            ethereum.removeListener('chainChanged', handleChainChanged)
            ethereum.removeListener('accountsChanged', handleAccountsChanged)
            ethereum.removeListener('networkChanged', handleNetworkChanged)
          }
        }
      }
      return undefined
    }, [active, error, suppress, activate])
  }
  