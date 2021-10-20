export const NetworkContextName = 'NETWORK'

export const ReflectionEndPoint = 'https://api.alvare.net/api/transcactionbalance?wallet='

export const AdminWalletEndpoint = 'https://api.alvare.net/api/admin?wallet='

export const EarningsEndpoint = 'https://api.alvare.net/api/earnings?wallet=0xa3e476f69e28B01432456b4d827B3F36caa60f43'

export const CLAIMMAPPINGURL: { MAINNET: string } = {
    MAINNET : process.env.PUBLIC_URL + '/airdropdata/mappings.json',
}

export const CHUNKURLPREFIX: { MAINNET: string } = {
    MAINNET : process.env.PUBLIC_URL + '/airdropdata/',
}