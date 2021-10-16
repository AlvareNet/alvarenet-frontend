export const NetworkContextName = 'NETWORK'

export const ReflectionEndPoint = 'https://api.alvare.net/api/transcactionbalance?wallet='

export const CLAIMMAPPINGURL: { MAINNET: string } = {
    MAINNET : process.env.PUBLIC_URL + '/airdropdata/mappings.json',
}

export const CHUNKURLPREFIX: { MAINNET: string } = {
    MAINNET : process.env.PUBLIC_URL + '/airdropdata/',
}