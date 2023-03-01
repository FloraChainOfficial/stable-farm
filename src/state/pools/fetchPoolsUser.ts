import { AbiItem } from 'web3-utils'
import poolsConfig from 'config/constants/pools'
import liquidFarmABI from 'config/abi/liquidfarm.json'
import sousChefABI from 'config/abi/sousChef.json'
import erc20ABI from 'config/abi/erc20.json'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import { getFloraStableFarmAddress } from 'utils/addressHelpers'
import { getWeb3 } from 'utils/web3'
import BigNumber from 'bignumber.js'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// ETH pools use the native ETH token (wrapping ? unwrapping is done at the contract level)
const nonEthPools = poolsConfig.filter((p) => p.stakingTokenName !== QuoteToken.ETH)
const ethPools = poolsConfig.filter((p) => p.stakingTokenName === QuoteToken.ETH)
const nonMasterPools = poolsConfig.filter((p) => p.sousId !== 0)
const web3 = getWeb3()
const liquidFarmContract = new web3.eth.Contract((liquidFarmABI as unknown) as AbiItem, getFloraStableFarmAddress())

export const fetchPoolsAllowance = async (account) => {
  const calls = nonEthPools.map((p) => ({
    address: p.stakingTokenAddress,
    name: 'allowance',
    params: [account, p.contractAddress[CHAIN_ID]],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return nonEthPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account) => {
  // Non ETH pools
  const calls = nonEthPools.map((p) => ({
    address: p.stakingTokenAddress,
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls)
  const tokenBalances = nonEthPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  // ETH pools
  const ethBalance = await web3.eth.getBalance(account)
  const ethBalances = ethPools.reduce(
    (acc, pool) => ({ ...acc, [pool.sousId]: new BigNumber(ethBalance).toJSON() }),
    {},
  )

  return { ...tokenBalances, ...ethBalances }
}

export const fetchUserStakeBalances = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: p.contractAddress[CHAIN_ID],
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(sousChefABI, calls)
  const stakedBalances = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  // Cake / Cake pool
  const { amount: masterPoolAmount } = await liquidFarmContract.methods.userInfo('0', account).call()

  return { ...stakedBalances, 0: new BigNumber(masterPoolAmount).toJSON() }
}

export const fetchUserPendingRewards = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: p.contractAddress[CHAIN_ID],
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(sousChefABI, calls)
  const pendingRewards = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  // Cake / Cake pool
  const pendingReward = await liquidFarmContract.methods.pendingUsdt('0', account).call()

  return { ...pendingRewards, 0: new BigNumber(pendingReward).toJSON() }
}
