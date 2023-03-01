import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [

  {
    pid: 0,
    risk: 0,
	isTokenOnly: true,
    lpSymbol: 'FYT',
    lpAddresses: {
      10500: '0x778325499118F2C710e38B8D55d06bF1b0e5C200',
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      10500: '0x778325499118F2C710e38B8D55d06bF1b0e5C200',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
  },

  {
    pid: 1,
    risk: 0,
    lpSymbol: 'FYT-USDT',
	// multiplier: '0X',
    lpAddresses: {
      10500: '0xeaAb1f07d3a11B9E8d7f51A3261a4b74A0A1b02e',
    },
    tokenSymbol: 'FYT',
    tokenAddresses: {
      10500: '0x778325499118F2C710e38B8D55d06bF1b0e5C200',
    },
    quoteTokenSymbol: QuoteToken.USDT,
    quoteTokenAdresses: contracts.usdt,
  },

]

export default farms
