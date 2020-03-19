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
          {{ formatPercent(rate, false, 2) }} APY
        </div>
      </q-card-section>

      <q-card-section class="main-card-section row justify-center items-center">
        <img
          :alt="`${tokenSymbol} logo`"
          class="col-auto q-mr-sm main-header-image"
          :src="`statics/logos/${tokenSymbol.toLowerCase()}.png`"
        >
        <div class="col-auto main-header">
          {{ tokenSymbol }} Borrow Rate
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="text-caption text-center q-mt-sm">
          Total borrows: {{ formatCurrency(supply, false, 2, 2) }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import mixinHelpers from 'src/utils/mixinHelpers';

export default {
  name: 'TemplateCompoundBorrow',

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

  computed: {
    ...mapState({
      rate(state) {
        return state.main.data.compoundStats[this.tokenSymbol].borrowRate;
      },
      supply(state) {
        return state.main.data.compoundStats[this.tokenSymbol].totalBorrows;
      },
    }),
  },
};
</script>
