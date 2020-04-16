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
  .schedule('0 * * * *') // every hour at HH:00
  .timeZone('America/Los_Angeles')
  .onRun(async () => {
    console.log('Running hourly function...');

    // Configure promises
    console.log('Configuring promises...');

    // Glassnode
    // https://docs.glassnode.com/api/addresses
    // Total number of unique addresses that ever appeared in a transaction of
    // the native coin in the network.
    const p1 = axios.get(`${glassnodeUrl}/v1/metrics/addresses/count?`, {
      params: { a: 'ETH', api_key: glassnodeApiKey },
    });
    // Number of unique addresses that were active in the network either as a sender
    // or receiver. Only addresses that were active in successful transactions are counted.
    const p2 = axios.get(`${glassnodeUrl}/v1/metrics/addresses/active_count?`, {
      params: { a: 'ETH', api_key: glassnodeApiKey },
    });
    // Number of unique addresses that were active as a sender of funds. Only addresses
    // that were active as a sender in successful non-zero transfers are counted.
    const p3 = axios.get(`${glassnodeUrl}/v1/metrics/addresses/sending_count?`, {
      params: { a: 'ETH', api_key: glassnodeApiKey },
    });
    // Number of unique addresses that were active as a receiver of funds. Only addresses
    // that were active as a receiver in successful non-zero transfers are counted.
    const p4 = axios.get(`${glassnodeUrl}/v1/metrics/addresses/receiving_count?`, {
      params: { a: 'ETH', api_key: glassnodeApiKey },
    });
    // Number of unique addresses that appeared for the first time in a transaction
    // of the native coin in the network.
    const p5 = axios.get(`${glassnodeUrl}/v1/metrics/addresses/new_non_zero_count?`, {
      params: { a: 'ETH', api_key: glassnodeApiKey },
    });
    // Number of unique non-zero addresses holding a positive (non-zero) amount of coins.
    const p6 = axios.get(`${glassnodeUrl}/v1/metrics/addresses/non_zero_count?`, {
      params: { a: 'ETH', api_key: glassnodeApiKey },
    });
    // Number of unique addresses holding at least 0.01 coins.
    const p7 = axios.get(`${glassnodeUrl}/v1/metrics/addresses/min_point_zero_1_count?`, {
      params: { a: 'ETH', api_key: glassnodeApiKey },
    });
    // Number of unique addresses holding at least 0.1 coins.
    const p8 = axios.get(`${glassnodeUrl}/v1/metrics/addresses/min_point_1_count?`, {
      params: { a: 'ETH', api_key: glassnodeApiKey },
    });
    // Number of unique addresses holding at least 1 coins.
    const p9 = axios.get(`${glassnodeUrl}/v1/metrics/addresses/min_1_count?`, {
      params: { a: 'ETH', api_key: glassnodeApiKey },
    });
    // Number of unique addresses holding at least 10 coins.
    const p10 = axios.get(`${glassnodeUrl}/v1/metrics/addresses/min_10_count?`, {
      params: { a: 'ETH', api_key: glassnodeApiKey },
    });
    // Number of unique addresses holding at least 100 coins.
    const p11 = axios.get(`${glassnodeUrl}/v1/metrics/addresses/min_100_count?`, {
      params: { a: 'ETH', api_key: glassnodeApiKey },
    });
    // Number of unique addresses holding at least 1k coins.
    const p12 = axios.get(`${glassnodeUrl}/v1/metrics/addresses/min_1k_count?`, {
      params: { a: 'ETH', api_key: glassnodeApiKey },
    });
    // Number of unique addresses holding at least 10k coins.
    const p13 = axios.get(`${glassnodeUrl}/v1/metrics/addresses/min_10k_count?`, {
      params: { a: 'ETH', api_key: glassnodeApiKey },
    });

    // Send requests
    console.log('Sending requests...');
    const [
      resTotalAddresses,
      resActiveAddresses,
      resSendingAddresses,
      resReceivingAddresses,
      resNewAddresses,
      resNonZeroAddresses,
      resPointZero1Addresses,
      resPoint1Addresses,
      res1Addresses,
      res10Addresses,
      res100Addresses,
      res1kAddresses,
      res10kAddresses,
    ] = await Promise.all([
      p1,
      p2,
      p3,
      p4,
      p5,
      p6,
      p7,
      p8,
      p9,
      p10,
      p11,
      p12,
      p13,
    ]);

    // Format data
    console.log('Parsing responses...');
    const data1 = {
      totalAddresses: resTotalAddresses.data,
      activeAddresses: resActiveAddresses.data,
      sendingAddresses: resSendingAddresses.data,
      receivingAddresses: resReceivingAddresses.data,
      newAddresses: resNewAddresses.data,
      nonZeroAddresses: resNonZeroAddresses.data,
    };
    const data2 = {
      pointZero1Addresses: resPointZero1Addresses.data,
      point1Addresses: resPoint1Addresses.data,
      _1Addresses: res1Addresses.data,
      _10Addresses: res10Addresses.data,
      _100Addresses: res100Addresses.data,
      _1kAddresses: res1kAddresses.data,
      _10kAddresses: res10kAddresses.data,
    };

    // Save data (we use multiple documents because otherwise this exceeds
    // the 1 MB size limit for documents)
    console.log('Saving data to database...');
    await firestore.collection('data').doc('hourly').set(data1);
    await firestore.collection('data').doc('hourly01').set(data2);
    console.log('Done!');
    return null;
  });
