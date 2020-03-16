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
          {{ formatCurrency(mkrPrice, true, 2, 2) }}
        </div>
      </q-card-section>

      <q-card-section class="main-card-section row justify-center items-center">
        <img
          alt="Maker logo"
          class="col-auto q-mr-sm main-header-image"
          src="statics/logos/mkr.png"
        >
        <div class="col-auto main-header">
          Maker Price
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import mixinHelpers from 'src/utils/mixinHelpers';

export default {
  name: 'DaiStatsMakerPrice',

  mixins: [mixinHelpers],

  computed: {
    ...mapState({
      mkrPrice: (state) => state.main.data.daiStats.mkrPrice,
    }),
  },
};
</script>
