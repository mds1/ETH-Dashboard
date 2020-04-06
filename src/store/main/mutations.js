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

export function setServerData(state, data) {
  state.data.addresses.totalAddresses = data.totalAddresses;
  state.data.addresses.activeAddresses = data.activeAddresses;
  state.data.addresses.sendingAddresses = data.sendingAddresses;
  state.data.addresses.receivingAddresses = data.receivingAddresses;
  state.data.addresses.newAddresses = data.newAddresses;
  state.data.addresses.nonZeroAddresses = data.nonZeroAddresses;
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

export function setAddressField(state, data) {
  state.data.addresses[data.fieldname] = data.values;
}
