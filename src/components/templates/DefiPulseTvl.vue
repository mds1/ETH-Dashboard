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
          {{ formatCurrency(price, true, 0, 0) }}
        </div>
      </q-card-section>

      <q-card-section class="main-card-section row justify-center items-center">
        <img
          alt="DeFi Pulse logo"
          class="col-auto q-mr-sm main-header-image"
          src="statics/logos/defipulse.png"
        >
        <div class="col-auto main-header">
          Total DeFi Value Locked, {{ currencySymbol.toUpperCase() }}
        </div>
      </q-card-section>

      <q-card-section
        v-if="currencySymbol.toUpperCase() === 'USD'"
        class="main-card-section"
      >
        <div class="text-caption text-center">
          {{ dominantName }} Dominance: {{ formatPercent(dominantPercent, false, 2) }}
          ({{ formatCurrency(dominantValue, true, 0, 0) }})
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import mixinHelpers from 'src/utils/mixinHelpers';

export default {
  name: 'TemplateDefiPulseTvl',

  mixins: [mixinHelpers],

  props: {
    source: {
      type: String,
      required: true,
    },

    currencySymbol: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState({
      price(state) {
        return state.main.data.defiPulse.tvl[this.currencySymbol.toLowerCase()];
      },
      dominantName: (state) => state.main.data.defiPulse.dominance.name,
      dominantValue: (state) => state.main.data.defiPulse.dominance.value,
      dominantPercent: (state) => state.main.data.defiPulse.dominance.percent,
    }),
  },
};
</script>
