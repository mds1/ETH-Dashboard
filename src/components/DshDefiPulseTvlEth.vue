<template>
  <div class="full-height">
    <DefiPulseTvl
      currency-symbol="ETH"
      :source="source"
    />
  </div>
</template>

<script>
import mixinHelpers from 'src/utils/mixinHelpers';
import { categories, sources } from 'src/utils/metadata';
import DefiPulseTvl from 'components/templates/DefiPulseTvl';

export default {
  name: 'DshDefiPulseTvlEth',

  components: {
    DefiPulseTvl,
  },

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.ethNetwork,
      title: 'TVL in DeFi (ETH)',
      description: 'Total value of assets locked in DeFi, denominated in Ether',
      source: sources.defiPulse,
    };
  },

};
</script>
