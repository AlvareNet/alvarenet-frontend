import { SupportedChainId } from "./chains"

type AddressMap = { [chainId: number]: string }

export const SLOTHI_MERKLE_DISTRIBUTER: AddressMap = {
    [SupportedChainId.BSC] : '0xf5a1c4396d3265d7cd47083c87ebc985703856e8',
}

export const SLOTHI: AddressMap = {
    [SupportedChainId.BSC] : '0x5B9dbeBbad94b8C6467Af9e8A851Bb120F9601c6',
}

export const SAMARI: AddressMap = {
    [SupportedChainId.BSC] : '0xb255cddf7fbaf1cbcc57d16fe2eaffffdbf5a8be',
}

export const CLAIMMAPPINGURL: { MAINNET: string } = {
    MAINNET : 'https://raw.githubusercontent.com/AlvareNet/AirdropData/Final/output/mappings.json',
}

export const CHUNKURLPREFIX: { MAINNET: string } = {
    MAINNET : 'https://raw.githubusercontent.com/AlvareNet/AirdropData/Final/output/',
}