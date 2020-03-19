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
          <span class="gas-medium">{{ gasPrice }}</span> gwei
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="main-header">
          Average Gas Price
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="text-caption text-center">
          {{ time }} minute wait
        </div>
        <div class="text-caption text-center">
          {{ formatCurrency(cost, true, 2, 4) }}/transfer
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ethers } from 'ethers';
import mixinHelpers from 'src/utils/mixinHelpers';
import { categories, sources } from 'src/utils/metadata';

export default {
  name: 'DshEgsGasPriceMedium',

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.ethNetwork,
      title: 'Average Gas Price',
      description: 'Gas price for average transactions',
      source: sources.egsApi,
    };
  },

  computed: {
    ...mapState({
      gasPrices: (state) => state.main.data.egsGasPrices,
      ethPrice: (state) => state.main.data.daiStats.ethPrice,
    }),

    gasPrice() {
      if (!this.gasPrices) return 0;
      return this.gasPrices.average / 10;
    },
    time() {
      if (!this.gasPrices) return 0;
      return this.gasPrices.avgWait;
    },
    cost() {
      if (!this.gasPrices) return 0;
      const val = Math.ceil(this.gasPrice * 21000 * this.ethPrice);
      if (Number.isNaN(val)) return 0;
      return ethers.utils.formatUnits(val, 9);
    },
  },
};
</script>
