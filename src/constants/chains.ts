export enum SupportedChainId {
    BSC = 56,
    BSC_TESTNET = 97,
    LOCALHOST = 1337
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
    SupportedChainId.BSC,
    SupportedChainId.BSC_TESTNET,
    SupportedChainId.LOCALHOST
  ]

interface ChainInfo {
    readonly [chainId : number]: {
    readonly RPC: string
    readonly label: string
    }
}

export const CHAIN_INFO: ChainInfo = {
    [SupportedChainId.BSC]: {
        RPC: 'https://bsc-dataseed.binance.org/',
        label: 'Binance Smart Chain'
    },
    [SupportedChainId.BSC_TESTNET]: {
        RPC: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
        label: 'BSC Testnet'
    },
    [SupportedChainId.LOCALHOST]: {
        RPC: 'http://127.0.0.1:8545',
        label: 'BSC Localhost'
    },
}