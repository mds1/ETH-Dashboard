<template>
  <div>
    <q-card class="main-card">
      <q-card-section class="main-card-section">
        <div class="text-caption main-caption">
          Source: {{ 'Maker contracts' }}
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="main-value">
          {{ formatCurrency(batPrice, true, 2, 4) }}
        </div>
      </q-card-section>

      <q-card-section class="main-card-section row justify-center items-center">
        <img
          alt="BAT logo"
          class="col-auto q-mr-sm main-header-image"
          src="statics/logos/bat.png"
        >
        <div class="col-auto main-header">
          BAT Price
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="text-caption text-center">
          Next oracle price: {{ formatCurrency(batPriceNxt, true, 2, 4) }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import mixinHelpers from 'src/utils/mixinHelpers';

export default {
  name: 'DaiStatsBatPrice',

  mixins: [mixinHelpers],

  computed: {
    ...mapState({
      batPrice: (state) => state.main.data.daiStats.batPrice,
      batPriceNxt: (state) => state.main.data.daiStats.batPriceNxt,
    }),
  },
};
</script>
