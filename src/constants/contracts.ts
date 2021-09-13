import { SupportedChainId } from "./chains"

type AddressMap = { [chainId: number]: string }

export const SLOTHI_MERKLE_DISTRIBUTER: AddressMap = {
    [SupportedChainId.BSC] : '0x5D1A00E7236D2d16A44842e238c4d1FBbF6dBe87',
    [SupportedChainId.BSC_TESTNET] : '0xb05423F517D3b17ED384c7D099ac5F93b03988AA',
    [SupportedChainId.LOCALHOST] : '0xb05423F517D3b17ED384c7D099ac5F93b03988AA'
}