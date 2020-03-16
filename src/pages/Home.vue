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
      v-model="componentsToShow"
      class="row justify-center q-mt-lg"
      group="components"
      @start="drag=true"
      @end="drag=false"
    >
      <div
        v-for="component in componentsToShow"
        :key="component.id"
        class="col-auto q-ma-md"
      >
        <component :is="component.componentName" />
      </div>
    </draggable>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import draggable from 'vuedraggable';
import { componentList } from 'src/utils/components';
import DaiStatsTotalDai from 'components/DaiStatsTotalDai';
import DaiStatsBatPrice from 'components/DaiStatsBatPrice';
import DaiStatsDaiPrice from 'components/DaiStatsDaiPrice';
import DaiStatsEthPrice from 'components/DaiStatsEthPrice';
import DaiStatsMkrPrice from 'components/DaiStatsMkrPrice';
import DaiStatsBatSf from 'components/DaiStatsBatSf';
import DaiStatsEthSf from 'components/DaiStatsEthSf';
import DaiStatsDsr from 'components/DaiStatsDsr';
import DaiStatsSurplus from 'components/DaiStatsSurplus';
import EgsGasPriceHighest from 'components/EgsGasPriceHighest';
import EgsGasPriceHigh from 'components/EgsGasPriceHigh';
import EgsGasPriceMedium from 'components/EgsGasPriceMedium';
import EgsGasPriceLow from 'components/EgsGasPriceLow';
import CompoundCdaiBorrow from 'components/CompoundCdaiBorrow';
import CompoundCdaiSupply from 'components/CompoundCdaiSupply';
import CompoundCusdcBorrow from 'components/CompoundCusdcBorrow';
import CompoundCusdcSupply from 'components/CompoundCusdcSupply';

export default {
  name: 'HomePage',

  components: {
    draggable,
    DaiStatsTotalDai,
    DaiStatsBatPrice,
    DaiStatsDaiPrice,
    DaiStatsEthPrice,
    DaiStatsMkrPrice,
    DaiStatsBatSf,
    DaiStatsEthSf,
    DaiStatsDsr,
    DaiStatsSurplus,
    EgsGasPriceHighest,
    EgsGasPriceHigh,
    EgsGasPriceMedium,
    EgsGasPriceLow,
    CompoundCdaiBorrow,
    CompoundCdaiSupply,
    CompoundCusdcBorrow,
    CompoundCusdcSupply,
  },

  data() {
    return {
      now: undefined,
      showMkrDialog: false,
      showWethDialog: false,
      componentList,
      componentOrder: undefined,
    };
  },

  computed: {
    ...mapState({
      // Array of booleans as to whether or not to show each component
      selectedComponents: (state) => state.main.selectedComponents,
      blockNumber: (state) => state.main.data.blockNumber,
    }),

    componentsToShow() {
      if (!this.selectedComponents) return undefined;
      return this.componentList.filter((component, index) => this.selectedComponents[index]);
    },

  },
};
</script>
