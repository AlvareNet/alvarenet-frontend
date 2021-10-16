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

export const ALVARENET: AddressMap = {
    [SupportedChainId.BSC] : '0x2488f8ce316cFaa9D9094C87fFf02E4552aC2dbD',
}

export const LIQUIDITY: AddressMap = {
    [SupportedChainId.BSC] : '0x46e5b309ec8cbeb6a789e3b3d77b44e205505c3f'
}