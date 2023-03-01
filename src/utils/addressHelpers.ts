import addresses from 'config/constants/contracts'

const chainId = process.env.REACT_APP_CHAIN_ID

export const getCakeAddress = () => {
  return addresses.cake[chainId]
}
export const getUsdtAddress = () => {
  return addresses.usdt[chainId]
}
export const getFloraStableFarmAddress = () => {
  return addresses.liquidFarm[chainId]
}
export const getMulticallAddress = () => {
  return addresses.mulltiCall[chainId]
}
export const getWethAddress = () => {
  return addresses.wbnb[chainId]
}

