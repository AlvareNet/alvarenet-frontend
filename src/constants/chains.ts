export enum SupportedChainId {
    BSC = 56,
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
    SupportedChainId.BSC,
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
    }
}