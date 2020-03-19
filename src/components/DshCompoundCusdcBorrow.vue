<template>
  <div class="full-height">
    <q-card class="main-card full-height">
      <q-card-section class="main-card-section">
        <div class="text-caption main-caption">
          Source: {{ source }}
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
import { categories, sources } from 'src/utils/metadata';

export default {
  name: 'DshCompoundCusdcBorrow',

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.compound,
      title: 'cUSDC Borrow Stats',
      description: 'cUSDC borrow rate and total borrowed',
      source: sources.compound,
    };
  },

  computed: {
    ...mapState({
      rate: (state) => state.main.data.compoundStats.cUSDC.borrowRate,
      supply: (state) => state.main.data.compoundStats.cUSDC.totalBorrows,
    }),
  },
};
</script>
