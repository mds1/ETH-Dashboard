<template>
  <div class="full-height">
    <coin-gecko-price
      token-symbol="DAI"
      :source="source"
    />
  </div>
</template>

<script>
import mixinHelpers from 'src/utils/mixinHelpers';
import { categories, sources } from 'src/utils/metadata';
import CoinGeckoPrice from 'components/templates/CoinGeckoPrice';

export default {
  name: 'DshCoinGeckoPriceDai',

  components: {
    CoinGeckoPrice,
  },

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.tokenPrices,
      title: 'DAI Price',
      description: 'Current price of Dai',
      source: sources.coinGecko,
    };
  },

};
</script>
