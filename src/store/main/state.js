export default function () {
  return {
    selectedComponents: undefined,
    provider: undefined,
    contracts: undefined, // object containing contract instances
    data: {
      blockNumber: undefined,
      networkId: undefined,
      daiStats: {},
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
    },
  };
}
