<template>
  <div class="full-height">
    <q-card class="main-card full-height">
      <q-card-section class="main-card-section">
        <div class="text-caption main-caption">
          Source: {{ source }}
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div
          v-if="tokenSymbol === 'DaiUsdc'"
          class="main-value"
        >
          {{ formatCurrency(daiInUsdc, true, 2, 4) }}
        </div>
        <div
          v-else
          class="main-value"
        >
          {{ formatCurrency(price, true, 2, 4) }}
        </div>
      </q-card-section>

      <q-card-section class="main-card-section row justify-center items-center">
        <img
          :alt="`${tokenSymbol.toLowerCase()} logo`"
          class="col-auto q-mr-sm main-header-image"
          :src="`statics/logos/${tokenSymbol.toLowerCase()}.png`"
        >
        <div
          v-if="tokenSymbol === 'DaiUsdc'"
          class="col-auto main-header"
        >
          DAI-USDC Price
        </div>
        <div
          v-else
          class="col-auto main-header"
        >
          {{ tokenSymbol }} Price
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import mixinHelpers from 'src/utils/mixinHelpers';

export default {
  name: 'TemplateCoinGeckoPrice',

  mixins: [mixinHelpers],

  props: {
    source: {
      type: String,
      required: true,
    },

    tokenSymbol: {
      type: String,
      required: true,
    },
  },

  // watch: {
  //   isDark() {
  //     this.generateFigure();
  //   },
  // },

  computed: {
    ...mapState({
      price(state) {
        return state.main.data.tokenPrices[this.tokenSymbol.toLowerCase()];
      },
      daiPrice: (state) => state.main.data.tokenPrices.dai,
      usdcPrice: (state) => state.main.data.tokenPrices.usdc,
    }),

    daiInUsdc() {
      return this.daiPrice / this.usdcPrice;
    },
  },
};
</script>
