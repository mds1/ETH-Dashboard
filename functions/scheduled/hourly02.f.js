// =================================================================================================
//                                COMMON CLOUD FUNCTION SETUP
//                   This section must be at the beginning of each cloud function
// =================================================================================================

const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize admin instance. We use a try/catch since it can only be initialized once, but
// we don't know which specific file or function will initialize it
try { admin.initializeApp(); } catch (e) { console.log(e); }
const firestore = admin.firestore();

// =================================================================================================
//                                MAIN FUNCTION DEFINITION
// =================================================================================================

const axios = require('axios');

// Setup Glassnode API
const glassnodeUrl = 'https://api.glassnode.com';
const glassnodeApiKey = functions.config().glassnode.api_key;

module.exports = functions.pubsub
  .schedule('2 * * * *') // every hour at HH:00
  .timeZone('America/Los_Angeles')
  .onRun(async () => {
    console.log('Running hourly function...');

    // Configure promises
    console.log('Configuring promises...');

    // Glassnode
    // https://docs.glassnode.com/api/distribution
    // The percent of total supply of the token that is held in smart contracts.
    const p1 = axios.get(`${glassnodeUrl}/v1/metrics/distribution/supply_contracts`, {
      params: { a: 'DAI', api_key: glassnodeApiKey },
    });
    const p2 = axios.get(`${glassnodeUrl}/v1/metrics/distribution/supply_contracts`, {
      params: { a: 'USDC', api_key: glassnodeApiKey },
    });
    const p3 = axios.get(`${glassnodeUrl}/v1/metrics/distribution/supply_contracts`, {
      params: { a: 'USDT', api_key: glassnodeApiKey },
    });
    const p4 = axios.get(`${glassnodeUrl}/v1/metrics/distribution/supply_contracts`, {
      params: { a: 'BAT', api_key: glassnodeApiKey },
    });
    const p5 = axios.get(`${glassnodeUrl}/v1/metrics/distribution/supply_contracts`, {
      params: { a: 'MKR', api_key: glassnodeApiKey },
    });
    // The percentage of external owned supply held by the top 1% addresses.
    // Smart contract addresses, exchange addresses and other special asset-specific
    // addresses (e.g. team fund addresses) are excluded.
    const p6 = axios.get(`${glassnodeUrl}/v1/metrics/distribution/balance_1pct_holders`, {
      params: { a: 'DAI', api_key: glassnodeApiKey },
    });
    const p7 = axios.get(`${glassnodeUrl}/v1/metrics/distribution/balance_1pct_holders`, {
      params: { a: 'USDC', api_key: glassnodeApiKey },
    });
    const p8 = axios.get(`${glassnodeUrl}/v1/metrics/distribution/balance_1pct_holders`, {
      params: { a: 'USDT', api_key: glassnodeApiKey },
    });
    const p9 = axios.get(`${glassnodeUrl}/v1/metrics/distribution/balance_1pct_holders`, {
      params: { a: 'BAT', api_key: glassnodeApiKey },
    });
    const p10 = axios.get(`${glassnodeUrl}/v1/metrics/distribution/balance_1pct_holders`, {
      params: { a: 'MKR', api_key: glassnodeApiKey },
    });
    // The gini coefficient for the distribution of coins over addresses. Smart
    // contract addresses, exchange addresses and other special asset-specific
    // addresses (e.g. team fund addresses) are excluded for the computation of the gini.
    const p11 = axios.get(`${glassnodeUrl}/v1/metrics/distribution/gini`, {
      params: { a: 'DAI', api_key: glassnodeApiKey },
    });
    const p12 = axios.get(`${glassnodeUrl}/v1/metrics/distribution/gini`, {
      params: { a: 'USDC', api_key: glassnodeApiKey },
    });
    const p13 = axios.get(`${glassnodeUrl}/v1/metrics/distribution/gini`, {
      params: { a: 'USDT', api_key: glassnodeApiKey },
    });
    const p14 = axios.get(`${glassnodeUrl}/v1/metrics/distribution/gini`, {
      params: { a: 'BAT', api_key: glassnodeApiKey },
    });
    const p15 = axios.get(`${glassnodeUrl}/v1/metrics/distribution/gini`, {
      params: { a: 'MKR', api_key: glassnodeApiKey },
    });

    // Send requests
    console.log('Sending requests...');
    const [
      resContractSupplyDai,
      resContractSupplyUsdc,
      resContractSupplyUsdt,
      resContractSupplyBat,
      resContractSupplyMkr,
      resBalance1PctDai,
      resBalance1PctUsdc,
      resBalance1PctUsdt,
      resBalance1PctBat,
      resBalance1PctMkr,
      resGiniDai,
      resGiniUsdc,
      resGiniUsdt,
      resGiniBat,
      resGiniMkr,
    ] = await Promise.all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15]);

    // Format data
    console.log('Parsing responses...');
    const data1 = {
      contractSupplyDai: resContractSupplyDai.data,
      contractSupplyUsdc: resContractSupplyUsdc.data,
      contractSupplyUsdt: resContractSupplyUsdt.data,
      contractSupplyBat: resContractSupplyBat.data,
      contractSupplyMkr: resContractSupplyMkr.data,
      balance1PctDai: resBalance1PctDai.data,
      balance1PctUsdc: resBalance1PctUsdc.data,
      balance1PctUsdt: resBalance1PctUsdt.data,
      balance1PctBat: resBalance1PctBat.data,
      balance1PctMkr: resBalance1PctMkr.data,
      giniDai: resGiniDai.data,
      giniUsdc: resGiniUsdc.data,
      giniUsdt: resGiniUsdt.data,
      giniBat: resGiniBat.data,
      giniMkr: resGiniMkr.data,
    };

    // Save data
    console.log('Saving data to database...');
    await firestore.collection('data').doc('hourly02').set(data1);
    console.log('Done!');
    return null;
  });
