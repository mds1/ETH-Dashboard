<template>
  <div>
    <q-card class="main-card">
      <q-card-section class="main-card-section">
        <div class="text-caption main-caption">
          Source: {{ 'Compound Contracts' }}
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="main-value">
          {{ formatPercent(rate, false, 2) }} APY
        </div>
      </q-card-section>

      <q-card-section class="main-card-section row justify-center items-center">
        <img
          alt="cUSDC logo"
          class="col-auto q-mr-sm main-header-image"
          src="statics/logos/cusdc.png"
        >
        <div class="col-auto main-header">
          cUSDC Borrow Rate
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="text-caption text-center q-mt-sm">
          Total borrows: {{ formatCurrency(supply, false, 2, 2) }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import mixinHelpers from 'src/utils/mixinHelpers';

export default {
  name: 'CompoundCusdcBorrow',

  mixins: [mixinHelpers],

  computed: {
    ...mapState({
      rate: (state) => state.main.data.compoundStats.cUSDC.borrowRate,
      supply: (state) => state.main.data.compoundStats.cUSDC.totalBorrows,
    }),
  },
};
</script>
