<template>
  <div class="full-height">
    <q-card class="main-card full-height">
      <q-card-section class="main-card-section">
        <div class="text-caption main-caption">
          Source: {{ 'CoinGecko API' }}
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="main-value">
          {{ formatCurrency(daiPrice, true, 2, 2) }}
        </div>
      </q-card-section>

      <q-card-section class="main-card-section row justify-center items-center">
        <img
          alt="Dai logo"
          class="col-auto q-mr-sm main-header-image"
          src="statics/logos/dai.png"
        >
        <div class="col-auto main-header">
          Dai Price
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import mixinHelpers from 'src/utils/mixinHelpers';

export default {
  name: 'DaiStatsDaiPrice',

  mixins: [mixinHelpers],

  computed: {
    ...mapState({
      daiPrice: (state) => state.main.data.daiStats.daiPrice,
    }),
  },
};
</script>
