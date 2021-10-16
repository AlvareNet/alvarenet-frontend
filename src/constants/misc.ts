export const NetworkContextName = 'NETWORK'

export const ReflectionEndPoint = 'http://85.114.131.207:1337/api/transcactionbalance?wallet='

export const CLAIMMAPPINGURL: { MAINNET: string } = {
    MAINNET : process.env.PUBLIC_URL + '/airdropdata/mappings.json',
}

export const CHUNKURLPREFIX: { MAINNET: string } = {
    MAINNET : process.env.PUBLIC_URL + '/airdropdata/',
}