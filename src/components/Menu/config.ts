import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
    {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'FloraSwap',
    icon: 'TradeIcon',
    href: 'https://floraswap.org/',
  },
  {
    label: 'Faucet',
    icon: 'VaultsIcon',
    href: 'https://faucet.floraswap.org/',
  },
  {
    label: '$FYT',
    icon: 'BondsIcon',
    items: [
	  {
        label: 'View Chart',
        href: 'https://dexscreener.com/bsc/0x0e13c909570473d334026d1fb15dcd59eb2098f6',
      },
	  {
        label: 'FloraSwap',
        href: 'https://floraswap.org/#/swap?outputCurrency=0x778325499118F2C710e38B8D55d06bF1b0e5C200',
      },
	  {
        label: 'PancakeSwap',
        href: 'https://pancakeswap.finance/swap?outputCurrency=0x77F2BE773CA0887ba2b3Ef8344C8CF13C98d8ca7',
      },
	  {
        label: 'Bilaxy',
        href: 'https://bilaxy.com/trade/FYT_USDT',
      },
    ],
  },
  {
    label: '$FLORA',
    icon: 'NftIcon',
    items: [
	  {
        label: 'View Chart',
        href: 'https://dexscreener.com/bsc/0x1b15d3d52b2aa07c405061de4206174883fc3fa2',
      },
	  {
        label: 'FloraSwap',
        href: 'https://floraswap.org/#/swap',
      },
	  {
        label: 'PancakeSwap',
        href: 'https://pancakeswap.finance/swap?inputCurrency=BNB&outputCurrency=0x122D1a550Db9449eeC315298803371eA9384265e',
      },
	  {
        label: 'TxBit',
        href: 'https://txbit.io/?r=562a8',
      },
    ],
  },
  {
    label: 'Charts',
    icon: 'InfoIcon',
    items: [
      {
        label: 'FloraSwap Charts',
        href: '/',
      },
    ],
  },
  {
    label: 'Bridge',
    icon: 'TicketIcon',
    href: 'https://bridge.florachain.org/',
  },
    {
    label: 'Twitter',
    icon: 'TwitterIcon',
    href: 'https://twitter.com/FloraChain',
  },
  {
    label: 'Telegram',
    icon: 'TelegramIcon',
    href: 'https://t.me/FloraChainOfficial',
  },
  {
    label: 'Website',
    icon: 'IfoIcon',
    href: 'https://florachain.org/',
  },

]

export default config
