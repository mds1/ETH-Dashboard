export function setProvider(state, provider) {
  console.log('provider2: ', provider);
  state.provider = provider;
}

export function setContracts(state, contracts) {
  state.contracts = contracts;
}

export function setData(state, data) {
  state.data = data;
}
