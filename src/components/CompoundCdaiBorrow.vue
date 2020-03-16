<template>
  <div class="full-height">
    <q-card class="main-card full-height">
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
          alt="cDAI logo"
          class="col-auto q-mr-sm main-header-image"
          src="statics/logos/cdai.png"
        >
        <div class="col-auto main-header">
          cDAI Borrow Rate
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
  name: 'CompoundCdaiBorrow',

  mixins: [mixinHelpers],

  computed: {
    ...mapState({
      rate: (state) => state.main.data.compoundStats.cDAI.borrowRate,
      supply: (state) => state.main.data.compoundStats.cDAI.totalBorrows,
    }),
  },
};
</script>
