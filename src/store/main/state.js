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
    },
  };
}
