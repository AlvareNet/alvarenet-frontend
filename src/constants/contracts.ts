import { SupportedChainId } from "./chains"

type AddressMap = { [chainId: number]: string }

export const SLOTHI_MERKLE_DISTRIBUTER: AddressMap = {
    [SupportedChainId.BSC] : '0x5D1A00E7236D2d16A44842e238c4d1FBbF6dBe87',
    [SupportedChainId.BSC_TESTNET] : '0xb05423F517D3b17ED384c7D099ac5F93b03988AA',
    [SupportedChainId.LOCALHOST] : '0xb05423F517D3b17ED384c7D099ac5F93b03988AA'
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

export const CLAIMMAPPINGURL = {
    TESTNET : 'https://raw.githubusercontent.com/AlvareNet/AirdropData/testnet/output/mappings.json',
    MAINNET : '0x0540EA525eA4E38Ed629F706F2724BaFf86eA47b',
}

export const CHUNKURL = {
    TESTNET : 'https://raw.githubusercontent.com/AlvareNet/AirdropData/main/output/',
    MAINNET : '0x0540EA525eA4E38Ed629F706F2724BaFf86eA47b',
}