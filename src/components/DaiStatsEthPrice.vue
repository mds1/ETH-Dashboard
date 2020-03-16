<template>
  <div class="full-height">
    <q-card class="main-card full-height">
      <q-card-section class="main-card-section">
        <div class="text-caption main-caption">
          Source: {{ 'Maker contracts' }}
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="main-value">
          {{ formatCurrency(ethPrice, true, 2, 2) }}
        </div>
      </q-card-section>

      <q-card-section class="main-card-section row justify-center items-center">
        <img
          alt="Ether logo"
          class="col-auto q-mr-sm main-header-image"
          src="statics/logos/eth.png"
        >
        <div class="col-auto main-header">
          Ether Price
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="text-caption text-center">
          Next oracle price: {{ formatCurrency(ethPriceNxt, true, 2, 2) }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import mixinHelpers from 'src/utils/mixinHelpers';

export default {
  name: 'DaiStatsEtherPrice',

  mixins: [mixinHelpers],

  computed: {
    ...mapState({
      ethPrice: (state) => state.main.data.daiStats.ethPrice,
      ethPriceNxt: (state) => state.main.data.daiStats.ethPriceNxt,
    }),
  },
};
</script>
