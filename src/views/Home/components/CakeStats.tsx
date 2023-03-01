import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance, useChefBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms, usePriceCakeUsdt } from '../../../state/hooks'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CakeStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const chefBalance = useChefBalance(getCakeAddress())
  const farms = useFarms();
  const usdtPrice = usePriceCakeUsdt();
  const circSupply = totalSupply ? totalSupply.minus(chefBalance) : new BigNumber(0);
  const cakeSupply = getBalanceNumber(circSupply);
  const marketCap = usdtPrice.times(circSupply);

  let usdtPerBlock = 0;
  if(farms && farms[0] && farms[0].usdtPerBlock){
    usdtPerBlock = new BigNumber(farms[0].usdtPerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          Pool Stats
        </Heading>
		<Row>
          <Text fontSize="14px">$FYT Max Supply</Text>
          {totalSupply && <CardValue fontSize="14px" value={getBalanceNumber(totalSupply)} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">$FYT Market Cap</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(marketCap)} decimals={0} prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px">Pool Reward Balance</Text>
          <Text bold fontSize="14px">{getBalanceNumber(chefBalance).toFixed(2)} USDT</Text>
        </Row>
        <Row>
          <Text fontSize="14px">Reward Per Block</Text>
          <Text bold fontSize="14px">{usdtPerBlock} USDT</Text>
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
