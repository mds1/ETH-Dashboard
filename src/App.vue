<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';

// Numbers ------------------------------------------------------------------------
// Dai/Maker Stats
import DshDaiStatsTotalDai from 'components/DshDaiStatsTotalDai';
import DshDaiStatsBatPrice from 'components/DshDaiStatsBatPrice';
import DshDaiStatsEthPrice from 'components/DshDaiStatsEthPrice';
import DshDaiStatsBatSf from 'components/DshDaiStatsBatSf';
import DshDaiStatsEthSf from 'components/DshDaiStatsEthSf';
import DshDaiStatsUsdcSf from 'components/DshDaiStatsUsdcSf';
import DshDaiStatsDsr from 'components/DshDaiStatsDsr';
import DshDaiStatsSurplus from 'components/DshDaiStatsSurplus';
import DshDaiStatsDaiFromUsdc from 'components/DshDaiStatsDaiFromUsdc';
// Token Prices
import DshCoinGeckoPriceDai from 'components/DshCoinGeckoPriceDai';
import DshCoinGeckoPriceDaiUsdc from 'components/DshCoinGeckoPriceDaiUsdc';
import DshCoinGeckoPriceMkr from 'components/DshCoinGeckoPriceMkr';
import DshCoinGeckoPriceUsdc from 'components/DshCoinGeckoPriceUsdc';
import DshCoinGeckoPriceEth from 'components/DshCoinGeckoPriceEth';
import DshCoinGeckoPriceBat from 'components/DshCoinGeckoPriceBat';
// Ethereum Network Stats
//   Gas Prices
import DshEgsGasPriceHighest from 'components/DshEgsGasPriceHighest';
import DshEgsGasPriceHigh from 'components/DshEgsGasPriceHigh';
import DshEgsGasPriceMedium from 'components/DshEgsGasPriceMedium';
import DshEgsGasPriceLow from 'components/DshEgsGasPriceLow';
//   ETH Supply
import DshEtherscanEthSupply from 'components/DshEtherscanEthSupply';
//   Total Value Locked in DeFi
import DshDefiPulseTvlUsd from 'components/DshDefiPulseTvlUsd';
import DshDefiPulseTvlEth from 'components/DshDefiPulseTvlEth';
// Compound Stats
import DshCompoundCdaiBorrow from 'components/DshCompoundCdaiBorrow';
import DshCompoundCdaiSupply from 'components/DshCompoundCdaiSupply';
import DshCompoundCusdcBorrow from 'components/DshCompoundCusdcBorrow';
import DshCompoundCusdcSupply from 'components/DshCompoundCusdcSupply';
// PoolTogether Stats
import DshPoolTogetherDaiPool from 'components/DshPoolTogetherDaiPool';
import DshPoolTogetherDaiPrize from 'components/DshPoolTogetherDaiPrize';
// Curve Stats
import DshCurveCompoundApy from 'components/DshCurveCompoundApy';
import DshCurveUsdtApy from 'components/DshCurveUsdtApy';
import DshCurveYtokenApy from 'components/DshCurveYtokenApy';
import DshCurveBusdApy from 'components/DshCurveBusdApy';

// Figures ------------------------------------------------------------------------
import DshCoinGeckoPriceHistoryBat from 'components/DshCoinGeckoPriceHistoryBat';
import DshCoinGeckoPriceHistoryDai from 'components/DshCoinGeckoPriceHistoryDai';
import DshCoinGeckoPriceHistoryEth from 'components/DshCoinGeckoPriceHistoryEth';
import DshCoinGeckoPriceHistoryMkr from 'components/DshCoinGeckoPriceHistoryMkr';
import DshCoinGeckoPriceHistoryUsdc from 'components/DshCoinGeckoPriceHistoryUsdc';

import DshGlassnodeTotalAddresses from 'components/DshGlassnodeTotalAddresses';
import DshGlassnodeActiveAddresses from 'components/DshGlassnodeActiveAddresses';
import DshGlassnodeNewAddresses from 'components/DshGlassnodeNewAddresses';
import DshGlassnodeSendReceiveAddresses from 'components/DshGlassnodeSendReceiveAddresses';
import DshGlassnodeBalanceAboveXAddresses from 'components/DshGlassnodeBalanceAboveXAddresses';
import DshGlassnodeContractSupply from 'components/DshGlassnodeContractSupply';
import DshGlassnodeBalance1Pct from 'components/DshGlassnodeBalance1Pct';
import DshGlassnodeGini from 'components/DshGlassnodeGini';

export default {
  name: 'App',

  components: {
    // Changing the order of components here will change the order they
    // shown in the first time a user loads the page

    /* eslint-disable vue/no-unused-components */

    // Numbers ------------------------------------------------------------------------
    // Dai/Maker Stats
    DshDaiStatsTotalDai,
    DshDaiStatsBatPrice,
    DshDaiStatsEthPrice,
    DshDaiStatsBatSf,
    DshDaiStatsEthSf,
    DshDaiStatsUsdcSf,
    DshDaiStatsDsr,
    DshDaiStatsSurplus,
    DshDaiStatsDaiFromUsdc,
    // Token Prices
    DshCoinGeckoPriceBat,
    DshCoinGeckoPriceDai,
    DshCoinGeckoPriceDaiUsdc,
    DshCoinGeckoPriceEth,
    DshCoinGeckoPriceMkr,
    DshCoinGeckoPriceUsdc,

    // Ethereum Network Stats
    //   Gas Prices
    DshEgsGasPriceHighest,
    DshEgsGasPriceHigh,
    DshEgsGasPriceMedium,
    DshEgsGasPriceLow,
    //   ETH Supply
    DshEtherscanEthSupply,
    //   Total Value Locked in DeFi
    DshDefiPulseTvlUsd,
    DshDefiPulseTvlEth,
    // Compound Stats
    DshCompoundCdaiBorrow,
    DshCompoundCdaiSupply,
    DshCompoundCusdcBorrow,
    DshCompoundCusdcSupply,
    // Compound Stats
    DshPoolTogetherDaiPool,
    DshPoolTogetherDaiPrize,
    // Curve Stats
    DshCurveCompoundApy,
    DshCurveUsdtApy,
    DshCurveYtokenApy,
    DshCurveBusdApy,
    // Figures ------------------------------------------------------------------------
    // Historical Token Prices
    DshCoinGeckoPriceHistoryBat,
    DshCoinGeckoPriceHistoryDai,
    DshCoinGeckoPriceHistoryEth,
    DshCoinGeckoPriceHistoryMkr,
    DshCoinGeckoPriceHistoryUsdc,
    // Glassnode Address Stats
    DshGlassnodeTotalAddresses,
    DshGlassnodeActiveAddresses,
    DshGlassnodeNewAddresses,
    DshGlassnodeSendReceiveAddresses,
    DshGlassnodeBalanceAboveXAddresses,
    DshGlassnodeContractSupply,
    DshGlassnodeBalance1Pct,
    DshGlassnodeGini,
  },

  computed: {
    ...mapState({
      provider: (state) => state.main.provider,
    }),
  },

  created() {
    // Check local storage for a dark mode setting
    const isDark = this.$q.localStorage.getItem('isDark');
    this.$q.dark.set(isDark);
    this.$store.dispatch('prefs/setDarkModeStatus', isDark);

    // Get list of all components
    const allComponents = this.$options.components; // object

    // Get user preferences
    const selectedComponents = this.$q.localStorage.getItem('selectedComponents');

    // Set components in state
    const numberOfComponents = Object.keys(allComponents).length;
    if (selectedComponents && numberOfComponents - 1 > selectedComponents.length) {
      // If in this block, new components were added, so let's account for them
      // (Note: We subtract 1 because App.vue is in that list)
      // New components are shown by default so user is aware of them
      this.$store.dispatch('prefs/setComponentDefaults', { allComponents, selectedComponents });
    } else if (selectedComponents) {
      // Found preferences in local storage, and no new components, so use those directly
      this.$store.dispatch('prefs/setComponentSelections', selectedComponents);
    } else {
      // Show all comopnents
      this.$store.dispatch('prefs/setComponentDefaults', {
        allComponents, selectedComponents: undefined,
      });
    }

    // Update data fetched on frontend on every new block
    this.$store.dispatch('main/pollSlow');
    this.provider.on('block', () => this.$store.dispatch('main/poll'));
    setInterval(() => {
      this.$store.dispatch('main/pollSlow');
    }, 30 * 60 * 1000); // every 30 minutes

    // Listen for updates from server data
    this.$firestore.collection('data').doc('hourly')
      .onSnapshot((doc) => { this.$store.commit('main/setServerData', doc.data()); });
    this.$firestore.collection('data').doc('hourly01')
      .onSnapshot((doc) => { this.$store.commit('main/setServerData', doc.data()); });
    this.$firestore.collection('data').doc('hourly02')
      .onSnapshot((doc) => { this.$store.commit('main/setGlassnodeData', doc.data()); });
  },
};
</script>
