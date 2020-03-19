import { provider } from 'boot/ethereum';
import { ethers } from 'ethers';

const addresses = require('src/addresses.json');

const { utils } = ethers;
const RAY = utils.bigNumberify('1000000000000000000000000000');

// =================================================================================================
// Start helper functions pulled from https://daistats.com/ source code

const POSITION_NXT = 4;

const jsonFetch = (url) => fetch(url).then((res) => res.json());

const unixToDateTime = (stamp) => `${new Date(stamp * 1000).toLocaleDateString('en-US')} ${new Date(
  stamp * 1000,
).toLocaleTimeString('en-US')}`;

const calcFee = (rate) => parseFloat(utils.formatUnits(rate, 27)) ** (60 * 60 * 24 * 365) * 100 - 100;

const getFee = (base, ilk) => {
  const { duty } = ilk;
  const combo = duty.add(base);
  return calcFee(combo);
};

const etherscanEthSupply = async () => {
  const json = await jsonFetch('https://api.etherscan.io/api?action=ethsupply&module=stats&apikey=N5TICDBVG4MHDS7CGPJ9MHXRYC1Y84963N');
  return json.result;
};

const getOSMPrice = async (osm, position) => {
  const val = await provider.getStorageAt(osm, position);
  return utils.bigNumberify(`0x${val.substring(34)}`);
};

const getMarketPrices = async () => {
  const json = await jsonFetch('https://api.coingecko.com/api/v3/simple/price?ids=maker%2Cdai%2Cusd-coin%2Cethereum%2Cbasic-attention-token&vs_currencies=usd');
  return json;
};

const getMKRAnnualBurn = (ethIlk, ethFee, batIlk, batFee, saiSupply, scdFee, savingsDai, potFee, mkrPrice) => {
  const daiFromETH = utils.formatEther(ethIlk.Art) * utils.formatUnits(ethIlk.rate, 27);
  const stabilityETH = ethFee / 100;
  const daiFromBAT = utils.formatEther(batIlk.Art) * utils.formatUnits(batIlk.rate, 27);
  const stabilityBAT = batFee / 100;
  const daiFromSai = utils.formatEther(saiSupply);
  const stabilitySai = scdFee / 100;
  const dsrDai = utils.formatUnits(savingsDai, 45);
  const dsrRate = potFee / 100;

  const mkrAnnualBurn = (
    ((daiFromETH * stabilityETH)
   + (daiFromBAT * stabilityBAT)
   + (daiFromSai * stabilitySai)
   - (dsrDai * dsrRate)
    )
  / mkrPrice
  );
  return mkrAnnualBurn;
};

// End helper functions pulled from https://daistats.com/ source code
// =================================================================================================

const getGasPrices = async () => {
  const json = await jsonFetch('https://ethgasstation.info/json/ethgasAPI.json');
  return json;
};


const compoundBlockTime = 14.5; // assumed block time, seconds
const compoundRateToApy = (rate) => {
  // rate must be an ethers.js BigNumber
  // const val = utils.formatEther(rate.mul(utils.bigNumberify('2102400')), 18);
  // return val;
  const parsedRate = Number(utils.formatUnits(rate, 18));
  const blocksPerYear = (365 * 24 * 60 * 60) / compoundBlockTime;
  const val = (1 + parsedRate) ** blocksPerYear - 1;
  return val * 100;
};

/**
 * @notice Returns ethers.js contract instance
 */
const createContractInstance = (address, name) => {
  // eslint-disable-next-line
  const abi = require(`src/abi/${name}.json`);
  return new ethers.Contract(address, abi, provider);
};

// Build contract instances (from https://daistats.com/)
const multi = createContractInstance(addresses.MULTICALL, 'Multicall');
const vat = createContractInstance(addresses.MCD_VAT, 'Vat');
const pot = createContractInstance(addresses.MCD_POT, 'Pot');
const jug = createContractInstance(addresses.MCD_JUG, 'Jug');
const vow = createContractInstance(addresses.MCD_VOW, 'Vow');
// const pit = createContractInstance(addresses.GEM_PIT, 'GemPit');
// const cat = createContractInstance(addresses.MCD_CAT, 'Cat');
const spot = createContractInstance(addresses.MCD_SPOT, 'Spotter');
const weth = createContractInstance(addresses.ETH, 'ERC20');
const bat = createContractInstance(addresses.BAT, 'ERC20');
const sai = createContractInstance(addresses.SAI, 'ERC20');
const usdc = createContractInstance(addresses.USDC, 'ERC20');
const saiTub = createContractInstance(addresses.SAI_TUB, 'SaiTub');
const dai = createContractInstance(addresses.MCD_DAI, 'Dai');
const mkr = createContractInstance(addresses.MCD_GOV, 'DSToken');
const chai = createContractInstance(addresses.CHAI, 'Chai');
const manager = createContractInstance(addresses.CDP_MANAGER, 'DssCdpManager');
const ethFlip = createContractInstance(addresses.MCD_FLIP_ETH_A, 'Flipper');
const batFlip = createContractInstance(addresses.MCD_FLIP_BAT_A, 'Flipper');
const flop = createContractInstance(addresses.MCD_FLOP, 'Flopper');
const flap = createContractInstance(addresses.MCD_FLAP, 'Flapper');
const ethIlkBytes = utils.formatBytes32String('ETH-A');
const batIlkBytes = utils.formatBytes32String('BAT-A');
const saiIlkBytes = utils.formatBytes32String('SAI');
const usdcIlkBytes = utils.formatBytes32String('USDC-A');
const usdcPip = createContractInstance(addresses.PIP_USDC, 'DSValue');

// const cBAT = createContractInstance(addresses.cBAT, 'cBAT');
const cDAI = createContractInstance(addresses.cDAI, 'cDAI');
// const cETH = createContractInstance(addresses.cETH, 'cETH');
// const cREP = createContractInstance(addresses.cREP, 'cREP');
// const cSAI = createContractInstance(addresses.cSAI, 'cSAI');
const cUSDC = createContractInstance(addresses.cUSDC, 'cUSDC');
// const cWBTC = createContractInstance(addresses.cWBTC, 'cWBTC');
// const cZRX = createContractInstance(addresses.cZRX, 'cZRX');


export function setProvider({ commit }, providerUsed) {
  commit('setProvider', providerUsed);
}

export function setContracts({ commit }, contracts) {
  commit('setContracts', contracts);
}

// eslint-disable-next-line
export async function poll({ commit }) {
  // eslint-disable-next-line
  console.log('Polling blockchain for latest data...');

  // Configure multicall queries
  const p1 = multi.aggregate([
    // Start with all queries from https://daistats.com/
    // source: https://github.com/nanexcool/daistats/blob/57e75fb3c11fa6d41192040455249b0bfacf42ef/src/App.jsx
    [addresses.MCD_VAT, vat.interface.functions.Line.encode([])],
    [addresses.MCD_VAT, vat.interface.functions.debt.encode([])],
    [addresses.MCD_VAT, vat.interface.functions.ilks.encode([ethIlkBytes])],
    [addresses.MCD_VAT, vat.interface.functions.ilks.encode([batIlkBytes])],
    [addresses.MCD_VAT, vat.interface.functions.ilks.encode([saiIlkBytes])],
    [addresses.MCD_VOW, vow.interface.functions.hump.encode([])],
    [addresses.MCD_VOW, vow.interface.functions.sump.encode([])],
    [addresses.MCD_DAI, dai.interface.functions.totalSupply.encode([])],
    [addresses.MCD_DAI, dai.interface.functions.balanceOf.encode([addresses.UNISWAP_DAI])],
    [addresses.SAI, sai.interface.functions.totalSupply.encode([])],
    [addresses.SAI, sai.interface.functions.balanceOf.encode([addresses.MCD_JOIN_SAI])],
    [addresses.MCD_GOV, mkr.interface.functions.balanceOf.encode([addresses.GEM_PIT])],
    [addresses.ETH, weth.interface.functions.balanceOf.encode([addresses.MCD_JOIN_ETH_A])],
    [addresses.BAT, bat.interface.functions.totalSupply.encode([])],
    [addresses.BAT, bat.interface.functions.balanceOf.encode([addresses.MCD_JOIN_BAT_A])],
    [addresses.MCD_POT, pot.interface.functions.Pie.encode([])],
    [addresses.MCD_POT, pot.interface.functions.chi.encode([])],
    [addresses.MCD_POT, pot.interface.functions.rho.encode([])],
    [addresses.CDP_MANAGER, manager.interface.functions.cdpi.encode([])],
    [addresses.MCD_JUG, jug.interface.functions.base.encode([])],
    [addresses.MCD_JUG, jug.interface.functions.ilks.encode([ethIlkBytes])],
    [addresses.MCD_JUG, jug.interface.functions.ilks.encode([batIlkBytes])],
    [addresses.MCD_JUG, jug.interface.functions.ilks.encode([saiIlkBytes])],
    [addresses.MCD_VAT, vat.interface.functions.dai.encode([addresses.MCD_VOW])],
    [addresses.MCD_VAT, vat.interface.functions.sin.encode([addresses.MCD_VOW])],
    [addresses.MCD_VOW, vow.interface.functions.Ash.encode([])],
    [addresses.MCD_VOW, vow.interface.functions.Sin.encode([])],
    [addresses.MCD_POT, pot.interface.functions.dsr.encode([])],
    [addresses.MCD_FLIP_ETH_A, ethFlip.interface.functions.kicks.encode([])],
    [addresses.MCD_FLIP_BAT_A, batFlip.interface.functions.kicks.encode([])],
    [addresses.MCD_SPOT, spot.interface.functions.ilks.encode([ethIlkBytes])],
    [addresses.MCD_SPOT, spot.interface.functions.ilks.encode([batIlkBytes])],
    [addresses.CHAI, chai.interface.functions.totalSupply.encode([])],
    [addresses.MCD_GOV, mkr.interface.functions.totalSupply.encode([])],
    [addresses.MCD_VAT, vat.interface.functions.vice.encode([])],
    [addresses.MCD_VOW, vow.interface.functions.bump.encode([])],
    [addresses.MCD_FLAP, flap.interface.functions.kicks.encode([])],
    [addresses.SAI_TUB, saiTub.interface.functions.tax.encode([])],
    [addresses.SAI_TUB, saiTub.interface.functions.fee.encode([])],
    [addresses.MCD_VAT, vat.interface.functions.ilks.encode([usdcIlkBytes])],
    [addresses.MCD_JUG, jug.interface.functions.ilks.encode([usdcIlkBytes])],
    [addresses.MCD_SPOT, spot.interface.functions.ilks.encode([usdcIlkBytes])],
    [addresses.USDC, usdc.interface.functions.totalSupply.encode([])],
    [addresses.USDC, usdc.interface.functions.balanceOf.encode([addresses.MCD_JOIN_USDC_A])],
    [addresses.MCD_FLOP, flop.interface.functions.kicks.encode([])],
    [addresses.MCD_VOW, vow.interface.functions.dump.encode([])],
    [addresses.PIP_USDC, usdcPip.interface.functions.read.encode([])],
    [addresses.MCD_GOV, mkr.interface.functions.balanceOf.encode([addresses.UNISWAP_MKR])],
    // Compound data, cDAI
    [addresses.cDAI, cDAI.interface.functions.borrowRatePerBlock.encode([])],
    [addresses.cDAI, cDAI.interface.functions.supplyRatePerBlock.encode([])],
    [addresses.cDAI, cDAI.interface.functions.exchangeRateCurrent.encode([])],
    [addresses.cDAI, cDAI.interface.functions.totalSupply.encode([])],
    [addresses.cDAI, cDAI.interface.functions.totalBorrowsCurrent.encode([])],
    [addresses.cDAI, cDAI.interface.functions.totalReserves.encode([])],
    // Compound data, cUSDC
    [addresses.cUSDC, cUSDC.interface.functions.borrowRatePerBlock.encode([])],
    [addresses.cUSDC, cUSDC.interface.functions.supplyRatePerBlock.encode([])],
    [addresses.cUSDC, cUSDC.interface.functions.exchangeRateCurrent.encode([])],
    [addresses.cUSDC, cUSDC.interface.functions.totalSupply.encode([])],
    [addresses.cUSDC, cUSDC.interface.functions.totalBorrowsCurrent.encode([])],
    [addresses.cUSDC, cUSDC.interface.functions.totalReserves.encode([])],
  ]);

  const p2 = etherscanEthSupply();
  const p3 = getOSMPrice(addresses.PIP_ETH, POSITION_NXT);
  const p4 = getOSMPrice(addresses.PIP_BAT, POSITION_NXT);
  const p5 = getMarketPrices();
  const p6 = getGasPrices();

  // Send promises
  const [
    [blockNumber, res], ethSupply, ethPriceNxt, batPriceNxt, marketPrices, egsGasPrices,
  ] = await Promise.all([p1, p2, p3, p4, p5, p6]);

  // Parse responses
  const ethIlk = vat.interface.functions.ilks.decode(res[2]);
  const batIlk = vat.interface.functions.ilks.decode(res[3]);
  const saiIlk = vat.interface.functions.ilks.decode(res[4]);
  const daiSupply = dai.interface.functions.totalSupply.decode(res[7]);
  const saiSupply = sai.interface.functions.totalSupply.decode(res[9]);
  const ethLocked = weth.interface.functions.balanceOf.decode(res[12]);
  const batSupply = bat.interface.functions.totalSupply.decode(res[13]);
  const batLocked = bat.interface.functions.balanceOf.decode(res[14]);
  const saiLocked = sai.interface.functions.balanceOf.decode(res[10]);
  const gemPit = mkr.interface.functions.balanceOf.decode(res[11]);
  const uniswapDai = dai.interface.functions.balanceOf.decode(res[8]);
  const base = jug.interface.functions.base.decode(res[19]);
  const ethFee = getFee(base, jug.interface.functions.ilks.decode(res[20]));
  const batFee = getFee(base, jug.interface.functions.ilks.decode(res[21]));
  const saiFee = getFee(base, jug.interface.functions.ilks.decode(res[22]));
  const jugEthDrip = jug.interface.functions.ilks.decode(res[20]);
  const jugBatDrip = jug.interface.functions.ilks.decode(res[21]);
  const vowDai = vat.interface.functions.dai.decode(res[23]);
  const vowSin = vat.interface.functions.dai.decode(res[24]);
  const ash = vow.interface.functions.Ash.decode(res[25]);
  const sin = vow.interface.functions.Sin.decode(res[26]);
  const surplusBuffer = vow.interface.functions.hump.decode(res[5]);
  const surplusBump = vow.interface.functions.bump.decode(res[35]);
  const debtSize = vow.interface.functions.sump.decode(res[6]);
  const potFee = calcFee(pot.interface.functions.dsr.decode(res[27])[0]);
  const savingsPie = pot.interface.functions.Pie.decode(res[15])[0];
  const pieChi = pot.interface.functions.chi.decode(res[16])[0];
  const savingsDai = savingsPie.mul(pieChi);
  const potDrip = pot.interface.functions.rho.decode(res[17])[0];
  const ethKicks = ethFlip.interface.functions.kicks.decode(res[28])[0];
  const batKicks = batFlip.interface.functions.kicks.decode(res[29])[0];
  const cdps = manager.interface.functions.cdpi.decode(res[18]);
  const ethMat = spot.interface.functions.ilks.decode(res[30]);
  const batMat = spot.interface.functions.ilks.decode(res[31]);
  const ethPrice = ethMat.mat.mul(ethIlk.spot).div(RAY);
  const batPrice = batMat.mat.mul(batIlk.spot).div(RAY);
  const sysLocked = ethPrice.mul(ethLocked[0]).add(batPrice.mul(batLocked[0])).add(saiLocked[0]);
  const chaiSupply = chai.interface.functions.totalSupply.decode(res[32])[0];
  const daiBrewing = chaiSupply.mul(pieChi);
  const mkrSupply = mkr.interface.functions.totalSupply.decode(res[33]);
  const vice = vat.interface.functions.vice.decode(res[34]);
  const flapKicks = flap.interface.functions.kicks.decode(res[36])[0];
  const saiTubTax = calcFee(saiTub.interface.functions.tax.decode(res[37])[0]);
  const saiTubFee = calcFee(saiTub.interface.functions.fee.decode(res[38])[0]);
  const usdcIlk = vat.interface.functions.ilks.decode(res[39]);
  const usdcFee = getFee(base, jug.interface.functions.ilks.decode(res[40]));
  const jugUsdcDrip = jug.interface.functions.ilks.decode(res[40]);
  const usdcSupply = usdc.interface.functions.totalSupply.decode(res[42]);
  const usdcLocked = usdc.interface.functions.balanceOf.decode(res[43]);
  const usdcPrice = usdcPip.interface.functions.read.decode(res[46])[0];
  const uniswapMkr = dai.interface.functions.balanceOf.decode(res[47]);
  const scdFee = saiTubTax + saiTubFee;
  // End daistats.com data

  // Begin our own data

  // Compound data, cDAI
  const cDaiBorrowRate = cDAI.interface.functions.borrowRatePerBlock.decode(res[48])[0];
  const cDaiSupplyRate = cDAI.interface.functions.borrowRatePerBlock.decode(res[49])[0];
  const cDaiExchangeRate = cDAI.interface.functions.exchangeRateCurrent.decode(res[50])[0];
  const cDaiTotalSupply = cDAI.interface.functions.totalSupply.decode(res[51])[0];
  const cDaiTotalBorrows = cDAI.interface.functions.totalBorrowsCurrent.decode(res[52])[0];
  const cDaiTotalReserves = cDAI.interface.functions.totalReserves.decode(res[53])[0];

  // Compound data, cUSDC
  const cUsdcBorrowRate = cUSDC.interface.functions.borrowRatePerBlock.decode(res[54])[0];
  const cUsdcSupplyRate = cUSDC.interface.functions.borrowRatePerBlock.decode(res[55])[0];
  const cUsdcExchangeRate = cUSDC.interface.functions.exchangeRateCurrent.decode(res[56])[0];
  const cUsdcTotalSupply = cUSDC.interface.functions.totalSupply.decode(res[57])[0];
  const cUsdcTotalBorrows = cUSDC.interface.functions.totalBorrowsCurrent.decode(res[58])[0];
  const cUsdcTotalReserves = cUSDC.interface.functions.totalReserves.decode(res[59])[0];

  const compoundStats = {
    cDAI: {
      borrowRate: compoundRateToApy(cDaiBorrowRate),
      supplyRate: compoundRateToApy(cDaiSupplyRate),
      exchangeRate: cDaiExchangeRate,
      totalSupply: utils.formatUnits(cDaiTotalSupply.mul(cDaiExchangeRate), 36),
      totalBorrows: utils.formatUnits(cDaiTotalBorrows, 18),
      totalReserves: utils.formatUnits(cDaiTotalReserves, 18),
    },
    cUSDC: {
      borrowRate: compoundRateToApy(cUsdcBorrowRate),
      supplyRate: compoundRateToApy(cUsdcSupplyRate),
      exchangeRate: cUsdcExchangeRate,
      totalSupply: utils.formatUnits(cUsdcTotalSupply.mul(cUsdcExchangeRate), 24),
      totalBorrows: utils.formatUnits(cUsdcTotalBorrows, 6),
      totalReserves: utils.formatUnits(cUsdcTotalReserves, 6),
    },
  };

  const tokenPrices = {
    bat: marketPrices['basic-attention-token'].usd,
    dai: marketPrices.dai.usd,
    eth: marketPrices.ethereum.usd,
    mkr: marketPrices.maker.usd,
    usdc: marketPrices['usd-coin'].usd,

  };

  const daiStats = {
    Line: utils.formatUnits(res[0], 45),
    debt: utils.formatUnits(res[1], 45),
    ilks: [
      {
        Art: utils.formatEther(ethIlk.Art),
        rate: utils.formatUnits(ethIlk.rate, 27),
        spot: utils.formatUnits(ethIlk.spot, 27),
        line: utils.formatUnits(ethIlk.line, 45),
        dust: utils.formatUnits(ethIlk.dust, 45),
      },
      {
        Art: utils.formatEther(batIlk.Art),
        rate: utils.formatUnits(batIlk.rate, 27),
        spot: utils.formatUnits(batIlk.spot, 27),
        line: utils.formatUnits(batIlk.line, 45),
        dust: utils.formatUnits(batIlk.dust, 45),
      },
      {
        Art: utils.formatEther(saiIlk.Art),
        rate: utils.formatUnits(saiIlk.rate, 27),
        spot: utils.formatUnits(saiIlk.spot, 27),
        line: utils.formatUnits(saiIlk.line, 45),
        dust: utils.formatUnits(saiIlk.dust, 45),
      },
      {
        Art: utils.formatEther(usdcIlk.Art),
        rate: utils.formatUnits(usdcIlk.rate, 27),
        spot: utils.formatUnits(usdcIlk.spot, 27),
        line: utils.formatUnits(usdcIlk.line, 45),
        dust: utils.formatUnits(usdcIlk.dust, 45),
      },
    ],
    daiSupply: utils.formatEther(daiSupply[0]),
    saiSupply: utils.formatEther(saiSupply[0]),
    ethSupply: utils.formatEther(ethSupply),
    batSupply: utils.formatEther(batSupply[0]),
    usdcSupply: utils.formatUnits(usdcSupply[0], 6),
    ethLocked: utils.formatEther(ethLocked[0]),
    batLocked: utils.formatEther(batLocked[0]),
    saiLocked: utils.formatEther(saiLocked[0]),
    usdcLocked: utils.formatUnits(usdcLocked[0], 6),
    gemPit: utils.formatEther(gemPit[0]),
    uniswapDai: utils.formatEther(uniswapDai[0]),
    uniswapMkr: utils.formatEther(uniswapMkr[0]),
    ethFee: ethFee.toFixed(2),
    batFee: batFee.toFixed(2),
    saiFee: saiFee.toFixed(2),
    usdcFee: usdcFee.toFixed(2),
    scdFee,
    jugEthDrip: unixToDateTime(jugEthDrip.rho.toNumber()),
    jugBatDrip: unixToDateTime(jugBatDrip.rho.toNumber()),
    jugUsdcDrip: unixToDateTime(jugUsdcDrip.rho.toNumber()),
    sysSurplus: utils.formatUnits(vowDai[0].sub(vowSin[0]), 45),
    sysDebt: utils.formatUnits(vowSin[0].sub(sin[0]).sub(ash[0]), 45),
    sysDebtRaw: vowSin[0]
      .sub(sin[0])
      .sub(ash[0])
      .toString(),
    surplusBuffer: utils.formatUnits(surplusBuffer[0], 45),
    surplusBump: utils.formatUnits(surplusBump[0], 45),
    debtSize: utils.formatUnits(debtSize[0], 45),
    potFee: potFee.toFixed(2),
    savingsPie: utils.formatEther(savingsPie),
    savingsDai: utils.formatUnits(savingsDai, 45),
    potDrip: unixToDateTime(potDrip.toNumber()),
    ethKicks: ethKicks.toNumber(),
    batKicks: batKicks.toNumber(),
    flapKicks: flapKicks.toNumber(),
    cdps: cdps.toString(),
    ethPrice: utils.formatUnits(ethPrice, 27),
    ethPriceNxt: utils.formatEther(ethPriceNxt),
    batPrice: utils.formatUnits(batPrice, 27),
    batPriceNxt: utils.formatEther(batPriceNxt),
    usdcPrice: utils.formatEther(usdcPrice),
    sysLocked: utils.formatUnits(sysLocked, 45),
    chaiSupply: utils.formatEther(chaiSupply),
    mkrSupply: utils.formatEther(mkrSupply[0]),
    mkrAnnualBurn: getMKRAnnualBurn(
      ethIlk,
      ethFee,
      batIlk,
      batFee,
      saiSupply[0],
      scdFee,
      savingsDai,
      potFee,
      tokenPrices.mkrPrice,
    ),
    vice: utils.formatUnits(vice[0], 45),
    daiBrewing: utils.formatUnits(daiBrewing, 45),
  };


  const data = {
    networkId: 1,
    blockNumber: blockNumber.toString(),
    daiStats,
    egsGasPrices,
    compoundStats,
    tokenPrices,
  };

  commit('setData', data);
}
