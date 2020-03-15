export default function () {
  return {
    selectedComponents: undefined,
    provider: undefined,
    contracts: undefined, // object containing contract instances
    data: {
      blockNumber: undefined,
      networkId: undefined,
      daiStats: {},
    },
  };
}
