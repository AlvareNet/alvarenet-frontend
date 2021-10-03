import { Web3Provider } from '@ethersproject/providers'

export default function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(
        provider,
        //Set the chain id of provider
        typeof provider.chainId === 'number'
        ? provider.chainId
        : typeof provider.chainId === 'string'
        ? parseInt(provider.chainId)
        : 'any'
    )
    //Set polling interval?
    return library
}