<template>
  <div class="full-height">
    <coin-gecko-price
      token-symbol="DaiUsdc"
      :source="source"
    />
  </div>
</template>

<script>
import mixinHelpers from 'src/utils/mixinHelpers';
import { categories, sources } from 'src/utils/metadata';
import CoinGeckoPrice from 'components/templates/CoinGeckoPrice';

export default {
  name: 'DshCoinGeckoPriceDaiUsdc',

  components: {
    CoinGeckoPrice,
  },

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.tokenPrices,
      title: 'DAI-USDC Price',
      description: 'Current price of DAI denominated in USDC',
      source: sources.coinGecko,
    };
  },

};
</script>
