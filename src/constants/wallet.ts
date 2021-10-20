import { AbstractConnector } from '@web3-react/abstract-connector'

import INJECTED_ICON_URL from '../assets/images/arrow-right.svg'
import METAMASK_ICON_URL from '../assets/images/metamask.png'
import WALLETCONNECT_ICON_URL from '../assets/images/walletConnectIcon.svg'
import { injected, walletconnect } from '../connectors'

interface WalletInfo {
    connector?: AbstractConnector
    name: string
    iconURL: string
    description: string
    href: string | null
    color: string
    primary?: true
    mobile?: true
    mobileOnly?: true
  }

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
    INJECTED: {
      connector: injected,
      name: 'Injected',
      iconURL: INJECTED_ICON_URL,
      description: 'Injected web3 provider, like Token Pocket, Trust Wallet and so on.',
      href: null,
      color: '#010101',
      primary: true,
      mobile: true
    },
    METAMASK: {
      connector: injected,
      name: 'MetaMask',
      iconURL: METAMASK_ICON_URL,
      description: 'Easy-to-use browser extension.',
      href: null,
      color: '#E8831D',
      mobile: true
    },
    WALLET_CONNECT: {
      connector: walletconnect,
      name: 'WalletConnect',
      iconURL: WALLETCONNECT_ICON_URL,
      description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
      href: null,
      color: '#4196FC',
      mobile: true,
    },
/*     TRUST_WALLET: {
      connector: injected,
      name: 'Trust Wallet',
      iconURL: METAMASK_ICON_URL,
      description: "Trust Wallet browser extension.",
      href: null,
      color: '#E8831D',
      mobile: true
    },
    BINANCE_WALLET: {
      connector: bsc,
      name: 'Binance Wallet',
      iconURL: METAMASK_ICON_URL,
      description: "Oficcial Binance Wallet",
      href: null,
      color: '#E8831D',
    },
    MATH_WALLET: {
      connector: injected,
      name: 'MathWallet',
      iconURL: METAMASK_ICON_URL,
      description: "MathWallet browser extension.",
      href: null,
      color: '#E8831D',
      mobile: true
    },
    TOKEN_POCKET: {
      connector: injected,
      name: 'TokenPocket',
      iconURL: METAMASK_ICON_URL,
      description: "TokenPocket browser extension.",
      href: null,
      color: '#E8831D',
      mobile: true
    },
    SAFE_PAL: {
      connector: injected,
      name: 'SafePal',
      iconURL: METAMASK_ICON_URL,
      description: "SafePal APP",
      href: null,
      color: '#E8831D',
      mobile: true,
      mobileOnly: true
    },
    COIN98: {
      connector: injected,
      name: 'Coin98',
      iconURL: METAMASK_ICON_URL,
      description: "Coin98 browser extension.",
      href: null,
      color: '#E8831D',
      mobile: true
    }, */

    
}