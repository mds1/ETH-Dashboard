<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DshDaiStatsTotalDai from 'components/DshDaiStatsTotalDai';
import DshDaiStatsBatPrice from 'components/DshDaiStatsBatPrice';
import DshDaiStatsEthPrice from 'components/DshDaiStatsEthPrice';
import DshDaiStatsBatSf from 'components/DshDaiStatsBatSf';
import DshDaiStatsEthSf from 'components/DshDaiStatsEthSf';
import DshDaiStatsUsdcSf from 'components/DshDaiStatsUsdcSf';
import DshDaiStatsDsr from 'components/DshDaiStatsDsr';
import DshDaiStatsSurplus from 'components/DshDaiStatsSurplus';
import DshDaiStatsDaiFromUsdc from 'components/DshDaiStatsDaiFromUsdc';

import DshCoinGeckoPriceDai from 'components/DshCoinGeckoPriceDai';
import DshCoinGeckoPriceMkr from 'components/DshCoinGeckoPriceMkr';
import DshCoinGeckoPriceUsdc from 'components/DshCoinGeckoPriceUsdc';
import DshCoinGeckoPriceEth from 'components/DshCoinGeckoPriceEth';
import DshCoinGeckoPriceBat from 'components/DshCoinGeckoPriceBat';

import DshEgsGasPriceHighest from 'components/DshEgsGasPriceHighest';
import DshEgsGasPriceHigh from 'components/DshEgsGasPriceHigh';
import DshEgsGasPriceMedium from 'components/DshEgsGasPriceMedium';
import DshEgsGasPriceLow from 'components/DshEgsGasPriceLow';

import DshCompoundCdaiBorrow from 'components/DshCompoundCdaiBorrow';
import DshCompoundCdaiSupply from 'components/DshCompoundCdaiSupply';
import DshCompoundCusdcBorrow from 'components/DshCompoundCusdcBorrow';
import DshCompoundCusdcSupply from 'components/DshCompoundCusdcSupply';

export default {
  name: 'App',

  components: {
    // Changing the order of components here will change the order they
    // shown in the first time a user loads the page
    /* eslint-disable vue/no-unused-components */
    DshDaiStatsTotalDai,
    DshDaiStatsBatPrice,
    DshDaiStatsEthPrice,
    DshDaiStatsBatSf,
    DshDaiStatsEthSf,
    DshDaiStatsUsdcSf,
    DshDaiStatsDsr,
    DshDaiStatsSurplus,
    DshDaiStatsDaiFromUsdc,
    //
    DshCoinGeckoPriceBat,
    DshCoinGeckoPriceDai,
    DshCoinGeckoPriceEth,
    DshCoinGeckoPriceMkr,
    DshCoinGeckoPriceUsdc,
    //
    DshEgsGasPriceHighest,
    DshEgsGasPriceHigh,
    DshEgsGasPriceMedium,
    DshEgsGasPriceLow,
    //
    DshCompoundCdaiBorrow,
    DshCompoundCdaiSupply,
    DshCompoundCusdcBorrow,
    DshCompoundCusdcSupply,
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

    // Update data on every new block
    this.$store.dispatch('main/poll');
    this.provider.on('block', () => this.$store.dispatch('main/poll'));
  },
};
</script>
