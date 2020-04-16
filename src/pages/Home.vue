<template>
  <q-page style="padding:0 0.5rem 2rem;">
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

export default {
  name: 'Home',

  components: {
    draggable,
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
