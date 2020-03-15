export default function () {
  return {
    provider: undefined,
    contracts: undefined, // object containing contract instances
    data: {
      blockNumber: undefined,
      networkId: undefined,
      daistats: undefined,
    },
  };
}
