export default function () {
  return {
    provider: undefined,
    contracts: undefined, // object containing contract instances
    data: {
      blockNumber: undefined,
      networkId: undefined,
      daiStats: {},
      tokenPrices: {
        bat: undefined,
        dai: undefined,
        eth: undefined,
        mkr: undefined,
        usdc: undefined,
      },
      tokenPriceHistory: {
        bat: [],
        dai: [],
        eth: [],
        mkr: [],
        usdc: [],
      },
      egsGasPrices: {
        fast: undefined,
        fastest: undefined,
        safeLow: undefined,
        average: undefined,
        block_time: undefined,
        blockNum: undefined,
        speed: undefined,
        safeLowWait: undefined,
        avgWait: undefined,
        fastWait: undefined,
        fastestWait: undefined,
      },
      compoundStats: {
        cDAI: { },
        cUSDC: { },
      },
      poolTogether: {
        dai: {
          totalEarningInterest: undefined,
          eligibleTickets: undefined,
          openTickets: undefined,
          sponsored: undefined,
          estimatedPrize: undefined,
          prizeDrawingDate: undefined,
        },
      },
      defiPulse: {
        tvl: {
          usd: undefined,
          eth: undefined,
        },
        dominance: {
          name: undefined,
          value: undefined,
          percent: undefined,
        },
      },
      curve: {
        compound: { dailyApr: undefined, weeklyApr: undefined },
        usdt: { dailyApr: undefined, weeklyApr: undefined },
        ytoken: { dailyApr: undefined, weeklyApr: undefined },
        busd: { dailyApr: undefined, weeklyApr: undefined },
      },
      addresses: {
        totalAddresses: [],
        activeAddresses: [],
        sendingAddresses: [],
        receivingAddresses: [],
        newAddresses: [],
        nonZeroAddresses: [],
      },
    },
  };
}
