import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import cakeABI from 'config/abi/cake.json'
import wbnbABI from 'config/abi/wbnb.json'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import { getWethAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export const fetchPoolsBlockLimits = async () => {
  const poolsWithEnd = poolsConfig.filter((p) => p.sousId !== 0)
  const callsStartBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: poolConfig.contractAddress[CHAIN_ID],
      name: 'startBlock',
    }
  })
  const callsEndBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: poolConfig.contractAddress[CHAIN_ID],
      name: 'bonusEndBlock',
    }
  })

  const starts = await multicall(sousChefABI, callsStartBlock)
  const ends = await multicall(sousChefABI, callsEndBlock)

  return poolsWithEnd.map((cakePoolConfig, index) => {
    const startBlock = starts[index]
    const endBlock = ends[index]
    return {
      sousId: cakePoolConfig.sousId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(endBlock).toJSON(),
    }
  })
}

export const fetchPoolsTotalStatking = async () => {
  const nonEthPools = poolsConfig.filter((p) => p.stakingTokenName !== QuoteToken.ETH)
  const ethPool = poolsConfig.filter((p) => p.stakingTokenName === QuoteToken.ETH)

  const callsNonEthPools = nonEthPools.map((poolConfig) => {
    return {
      address: poolConfig.stakingTokenAddress,
      name: 'balanceOf',
      params: [poolConfig.contractAddress[CHAIN_ID]],
    }
  })

  const callsEthPools = ethPool.map((poolConfig) => {
    return {
      address: getWethAddress(),
      name: 'balanceOf',
      params: [poolConfig.contractAddress[CHAIN_ID]],
    }
  })

  const nonEthPoolsTotalStaked = await multicall(cakeABI, callsNonEthPools)
  const ethPoolsTotalStaked = await multicall(wbnbABI, callsEthPools)

  return [
    ...nonEthPools.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(nonEthPoolsTotalStaked[index]).toJSON(),
    })),
    ...ethPool.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(ethPoolsTotalStaked[index]).toJSON(),
    })),
  ]
}
