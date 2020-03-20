<template>
  <q-page padding>
    <!-- MAIN CONTENT -->
    <div
      v-if="!blockNumber"
      class="text-center q-mt-xl"
    >
      <q-spinner
        color="primary"
        size="4em"
      />
      <div class="q-mt-lg">
        Loading data...
      </div>
    </div>
    <draggable
      v-else
      class="row justify-center q-mt-lg"
      group="components"
      @start="drag=true"
      @end="drag=false"
    >
      <div
        v-for="component in selectedComponentsArray"
        :key="component.id"
        class="col-auto q-ma-md"
      >
        <component :is="component.name" />
      </div>
    </draggable>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import draggable from 'vuedraggable';
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

export default {
  name: 'Home',

  components: {
    draggable,
    /* eslint-disable vue/no-unused-components */
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
    DshCoinGeckoPriceEth,
    DshCoinGeckoPriceMkr,
    DshCoinGeckoPriceUsdc,
    // Ethereum Network Stats
    //   Gas Prices
    DshEgsGasPriceHighest,
    DshEgsGasPriceHigh,
    DshEgsGasPriceMedium,
    DshEgsGasPriceLow,
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
  },

  data() {
    return {
      now: undefined,
      showMkrDialog: false,
      showWethDialog: false,
    };
  },

  computed: {
    ...mapState({
      allComponents: (state) => state.prefs.allComponents,
      blockNumber: (state) => state.main.data.blockNumber,
    }),

    selectedComponentsArray() {
      return this.allComponents.filter((component) => component.isShown === true);
    },

  },
};
</script>
