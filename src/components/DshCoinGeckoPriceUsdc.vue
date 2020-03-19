<template>
  <div class="full-height">
    <coin-gecko-price
      token-symbol="USDC"
      :source="source"
    />
  </div>
</template>

<script>
import mixinHelpers from 'src/utils/mixinHelpers';
import { categories, sources } from 'src/utils/metadata';
import CoinGeckoPrice from 'components/templates/CoinGeckoPrice';

export default {
  name: 'DshCoinGeckoPriceUsdc',

  components: {
    CoinGeckoPrice,
  },

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.tokenPrices,
      title: 'USDC Price',
      description: 'Current price of USD Coin',
      source: sources.coinGecko,
    };
  },

};
</script>
