<template>
  <div class="full-height">
    <coin-gecko-price
      token-symbol="MKR"
      :source="source"
    />
  </div>
</template>

<script>
import mixinHelpers from 'src/utils/mixinHelpers';
import { categories, sources } from 'src/utils/metadata';
import CoinGeckoPrice from 'components/templates/CoinGeckoPrice';

export default {
  name: 'DshCoinGeckoPriceMkr',

  components: {
    CoinGeckoPrice,
  },

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.tokenPrices,
      title: 'MKR Price',
      description: 'Current price of Maker',
      source: sources.coinGecko,
    };
  },

};
</script>
