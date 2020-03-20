<template>
  <div class="full-height">
    <DefiPulseTvl
      currency-symbol="USD"
      :source="source"
    />
  </div>
</template>

<script>
import mixinHelpers from 'src/utils/mixinHelpers';
import { categories, sources } from 'src/utils/metadata';
import DefiPulseTvl from 'components/templates/DefiPulseTvl';

export default {
  name: 'DshDefiPulseTvlUsd',

  components: {
    DefiPulseTvl,
  },

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.ethNetwork,
      title: 'TVL in DeFi (USD)',
      description: 'Total value of assets locked in DeFi, denominated in USD',
      source: sources.defiPulse,
    };
  },

};
</script>
