<template>
  <div>
    <q-card class="main-card">
      <q-card-section class="main-card-section">
        <div class="text-caption main-caption">
          Source: {{ 'ETH Gas Station API' }}
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="main-value">
          <span class="gas-high">{{ gasPrice }}</span> gwei
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="main-header">
          Fast Gas Price
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
import mixinHelpers from 'src/utils/mixinHelpers';
import { ethers } from 'ethers';

export default {
  name: 'EgsGasPriceHigh',

  mixins: [mixinHelpers],

  computed: {
    ...mapState({
      gasPrices: (state) => state.main.data.egsGasPrices,
      ethPrice: (state) => state.main.data.daiStats.ethPrice,
    }),

    gasPrice() {
      if (!this.gasPrices) return 0;
      return this.gasPrices.fast / 10;
    },
    time() {
      if (!this.gasPrices) return 0;
      return this.gasPrices.fastWait;
    },
    cost() {
      if (!this.gasPrices) return 0;
      const val = Math.ceil(this.gasPrice * 21000 * this.ethPrice);
      return ethers.utils.formatUnits(val, 9);
    },
  },
};
</script>
