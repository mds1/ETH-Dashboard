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
  name: 'Home',

  components: {
    draggable,
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
    DshCoinGeckoPriceDai,
    DshCoinGeckoPriceMkr,
    DshCoinGeckoPriceUsdc,
    DshCoinGeckoPriceEth,
    DshCoinGeckoPriceBat,
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
