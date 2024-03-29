import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'

import { injected } from '../connectors'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { Web3Provider } from '@ethersproject/providers'
import { NetworkContextName } from '../constants/misc'
import { isMobile } from 'react-device-detect'

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> {
  const context = useWeb3React<Web3Provider>()
  const contextNetwork = useWeb3React<Web3Provider>(NetworkContextName)
  return context.active ? context : contextNetwork
}

export function useBlockNumber() : number {
  const { chainId, library } = useWeb3React()

  const [blockNumber, setBlockNumber] = useState<number>(0)
  useEffect((): any => {
    if (!!library) {
      let stale = false

      library
        .getBlockNumber()
        .then((blockNumber: number) => {
          if (!stale) {
            setBlockNumber(blockNumber)
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(0)
          }
        })

      const updateBlockNumber = (blockNumber: number) => {
        setBlockNumber(blockNumber)
      }
      library.on('block', updateBlockNumber)

      return () => {
        stale = true
        library.removeListener('block', updateBlockNumber)
        setBlockNumber(0)
      }
    }
  }, [library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

  return blockNumber
}
export function useEagerConnect() {
    const { activate, active } = useWeb3React()
    const [tried, setTried] = useState(false)

    useEffect(() => {
      if(!tried){
        injected.isAuthorized().then((isAuthorized: boolean) => {
          if (isAuthorized) {
            activate(injected, undefined, true).catch(() => {
             setTried(true)
            })
          } else {
            if (isMobile && window.ethereum) {
              activate(injected, undefined, true).catch(() => {
                setTried(true)
              })
            } else {
              setTried(true)
            }
          }
        })
      }
      }, [activate, active, tried]) // intentionally only running on mount (make sure it's only mounted once :))
    
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
            activate(injected, undefined, true).catch((error) => {
              console.error('Failed to activate after accounts changed', error)
            })
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
  