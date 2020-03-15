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
