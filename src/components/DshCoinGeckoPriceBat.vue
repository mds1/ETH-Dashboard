<template>
  <div class="full-height">
    <coin-gecko-price
      token-symbol="Bat"
      :source="source"
    />
  </div>
</template>

<script>
import mixinHelpers from 'src/utils/mixinHelpers';
import { categories, sources } from 'src/utils/metadata';
import CoinGeckoPrice from 'components/templates/CoinGeckoPrice';

export default {
  name: 'DshCoinGeckoPriceBat',

  components: {
    CoinGeckoPrice,
  },

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.tokenPrices,
      title: 'BAT Price',
      description: 'Current price of Basic Attention Token',
      source: sources.coinGecko,
    };
  },

};
</script>
