export function setProvider(state, provider) {
  try {
    // Object.assign fails if provider is undefined
    Object.assign(state.provider, provider);
  } catch {
    state.provider = provider;
  }
}

export function setContracts(state, contracts) {
  try {
    Object.assign(state.contracts, contracts);
  } catch {
    state.contracts = contracts;
  }
}

export function setData(state, data) {
  try {
    Object.assign(state.data, data);
  } catch {
    state.data = data;
  }
}

/**
 * @param {*} data Object containing `token` and `prices` fields
 *   `token` must be the lowercase abbreviate, e.g. eth or mkr
 *   `prices` must be an array of arrays where the first element in each
*     array is the timestamp and the second is the price
 */
export function setTokenPriceHistory(state, data) {
  const tokenName = data.token;
  const { prices } = data;
  state.data.tokenPriceHistory[tokenName] = [];
  try {
    Object.assign(state.data.tokenPriceHistory[tokenName], prices);
  } catch {
    state.data.tokenPriceHistory[tokenName] = prices;
  }
}
