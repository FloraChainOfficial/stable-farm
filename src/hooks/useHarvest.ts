import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserBalance, updateUserPendingReward } from 'state/actions'
import { soushHarvest, soushHarvestEth, harvest } from 'utils/callHelpers'
import { useLiquidfarm, useSousChef } from './useContract'

export const useHarvest = (farmPid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const liquidFarmContract = useLiquidfarm()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(liquidFarmContract, farmPid, account)
    dispatch(fetchFarmUserDataAsync(account))
    return txHash
  }, [account, dispatch, farmPid, liquidFarmContract])

  return { onReward: handleHarvest }
}

export const useAllHarvest = (farmPids: number[]) => {
  const { account } = useWallet()
  const liquidFarmContract = useLiquidfarm()

  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => {
      return [...accum, harvest(liquidFarmContract, pid, account)]
    }, [])

    return Promise.all(harvestPromises)
  }, [account, farmPids, liquidFarmContract])

  return { onReward: handleHarvest }
}

export const useSousHarvest = (sousId, isUsingEth = false) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const sousChefContract = useSousChef(sousId)
  const liquidFarmContract = useLiquidfarm()

  const handleHarvest = useCallback(async () => {
    if (sousId === 0) {
      await harvest(liquidFarmContract, 0, account)
    } else if (isUsingEth) {
      await soushHarvestEth(sousChefContract, account)
    } else {
      await soushHarvest(sousChefContract, account)
    }
    dispatch(updateUserPendingReward(sousId, account))
    dispatch(updateUserBalance(sousId, account))
  }, [account, dispatch, isUsingEth, liquidFarmContract, sousChefContract, sousId])

  return { onReward: handleHarvest }
}
