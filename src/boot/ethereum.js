import { ethers } from 'ethers';

const provider = ethers.getDefaultProvider('homestead');

const addresses = require('src/addresses.json');

export { provider };

export default async ({ store /* app, router, Vue, ... */ }) => {
  // Setup provider
  store.dispatch('main/setProvider', provider);

  /**
   * @notice Create ethers contract instance
   * @param {String} name contract name
   * @param {String} address for internal contracts, provide contract address
   */
  const createContractInstance = (name, address) => {
    // eslint-disable-next-line
    const abi = require(`src/abi/${name}.json`);
    return new ethers.Contract(address, abi, provider);
  };

  // something to do
  // const fakerContract = createContractInstance('faker', addresses.faker);
  const multicall = createContractInstance('Multicall', addresses.MULTICALL);
  // const wethContract = createContractInstance('weth', addresses.weth);
  // const daiContract = createContractInstance('dai', addresses.dai);
  // const makerContract = createContractInstance('maker', addresses.maker);
  // const chiefContract = createContractInstance('chief', addresses.chief);

  store.dispatch('main/setContracts', {
    // fakerContract,
    multicall,
    // wethContract,
    // daiContract,
    // makerContract,
    // chiefContract,
  });
};
