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
          {{ formatCurrency(ethSupply, false, 0, 0) }}
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="main-header">
          Total Ether Supply
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="text-caption text-center q-mt-sm">
          {{ formatPercent(ethInDefiPercent, false, 2) }} of this locked in DeFi
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
  name: 'DshEtherscanEthSupply',

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.ethNetwork,
      title: 'Total ETH Supply',
      description: 'Total supply of Ether',
      source: sources.etherscan,
    };
  },

  computed: {
    ...mapState({
      ethSupply: (state) => state.main.data.ethSupply,
      amountInDefi: (state) => state.main.data.defiPulse.tvl.eth,
    }),
    ethInDefiPercent() {
      return 100 * (this.amountInDefi / this.ethSupply);
    },
  },
};
</script>
