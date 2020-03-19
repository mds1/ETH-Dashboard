<template>
  <div class="full-height">
    <coin-gecko-price
      token-symbol="ETH"
      :source="source"
    />
  </div>
</template>

<script>
import mixinHelpers from 'src/utils/mixinHelpers';
import { categories, sources } from 'src/utils/metadata';
import CoinGeckoPrice from 'components/templates/CoinGeckoPrice';

export default {
  name: 'DshCoinGeckoPriceEth',

  components: {
    CoinGeckoPrice,
  },

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.tokenPrices,
      title: 'ETH Price',
      description: 'Current price of Ether',
      source: sources.coinGecko,
    };
  },

};
</script>
