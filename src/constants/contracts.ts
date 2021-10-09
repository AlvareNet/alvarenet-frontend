import { SupportedChainId } from "./chains"

type AddressMap = { [chainId: number]: string }

export const SLOTHI_MERKLE_DISTRIBUTER: AddressMap = {
    [SupportedChainId.BSC] : '0xf5a1c4396d3265d7cd47083c87ebc985703856e8',
    [SupportedChainId.BSC_TESTNET] : '0xaAb23dEa658d12EEB3028707D4C12562feFDf9EA',
    [SupportedChainId.LOCALHOST] : '0xaAb23dEa658d12EEB3028707D4C12562feFDf9EA'
}

export const SLOTHI: AddressMap = {
    [SupportedChainId.BSC] : '0x5B9dbeBbad94b8C6467Af9e8A851Bb120F9601c6',
    [SupportedChainId.BSC_TESTNET] : '0x0540EA525eA4E38Ed629F706F2724BaFf86eA47b',
    [SupportedChainId.LOCALHOST] : '0x0540EA525eA4E38Ed629F706F2724BaFf86eA47b'
}

export const SAMARI: AddressMap = {
    [SupportedChainId.BSC] : '0xb255cddf7fbaf1cbcc57d16fe2eaffffdbf5a8be',
    [SupportedChainId.BSC_TESTNET] : '0xa600208eE2E0aD1b7A1f9E04e634b6B93fB1bE7e',
    [SupportedChainId.LOCALHOST] : '0xa600208eE2E0aD1b7A1f9E04e634b6B93fB1bE7e'
}

export const CLAIMMAPPINGURL: { TESTNET: string, MAINNET: string } = {
    TESTNET : 'https://raw.githubusercontent.com/AlvareNet/AirdropData/testnet/output/mappings.json',
    MAINNET : 'https://raw.githubusercontent.com/AlvareNet/AirdropData/Final/output/mappings.json',
}

export const CHUNKURLPREFIX: { TESTNET: string, MAINNET: string } = {
    TESTNET : 'https://raw.githubusercontent.com/AlvareNet/AirdropData/testnet/output/',
    MAINNET : 'https://raw.githubusercontent.com/AlvareNet/AirdropData/Final/output/mappings.json',
}