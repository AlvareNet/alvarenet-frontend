import { SupportedChainId } from "./chains"

type AddressMap = { [chainId: number]: string }

export const SLOTHI_MERKLE_DISTRIBUTER: AddressMap = {
    [SupportedChainId.BSC] : '0xd6DB220c2A375E9d4AB3acfB1ba123b127799798',
}

export const SLOTHI: AddressMap = {
    [SupportedChainId.BSC] : '0x5B9dbeBbad94b8C6467Af9e8A851Bb120F9601c6',
}

export const SAMARI: AddressMap = {
    [SupportedChainId.BSC] : '0xb255cddf7fbaf1cbcc57d16fe2eaffffdbf5a8be',
}

export const CLAIMMAPPINGURL: { MAINNET: string } = {
    MAINNET : process.env.PUBLIC_URL + '/airdropdata/mappings.json',
}

export const CHUNKURLPREFIX: { MAINNET: string } = {
    MAINNET : process.env.PUBLIC_URL + '/airdropdata/',
}