<template>
  <q-page padding>
    <!-- MAIN CONTENT -->
    <div class="row justify-center q-mt-lg">
      <div
        v-for="component in componentsToShow"
        :key="component.id"
        class="col-auto q-ma-md"
      >
        <component :is="component.componentName" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
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

export default {
  name: 'HomePage',

  components: {
    DaiStatsTotalDai,
    DaiStatsBatPrice,
    DaiStatsDaiPrice,
    DaiStatsEthPrice,
    DaiStatsMkrPrice,
    DaiStatsBatSf,
    DaiStatsEthSf,
    DaiStatsDsr,
    DaiStatsSurplus,
  },

  data() {
    return {
      now: undefined,
      showMkrDialog: false,
      showWethDialog: false,
      componentList,
    };
  },

  computed: {
    ...mapState({
      // Array of booleans as to whether or not to show each component
      selectedComponents: (state) => state.main.selectedComponents,
    }),

    componentsToShow() {
      if (!this.selectedComponents) return undefined;
      return this.componentList.filter((component, index) => this.selectedComponents[index]);
    },

  },
};
</script>
