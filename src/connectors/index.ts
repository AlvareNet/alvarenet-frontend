import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

import { ALL_SUPPORTED_CHAIN_IDS, CHAIN_INFO, SupportedChainId } from '../constants/chains'

  export const injected = new InjectedConnector({ supportedChainIds: ALL_SUPPORTED_CHAIN_IDS })
  
  export const network = new NetworkConnector({
    urls: { 56: CHAIN_INFO[56].RPC, 97: CHAIN_INFO[97].RPC },
    defaultChainId: SupportedChainId.BSC
  })
  
  export const walletconnect = new WalletConnectConnector({
    rpc: { 56: CHAIN_INFO[56].RPC, 97: CHAIN_INFO[97].RPC },
    qrcode: true
  })