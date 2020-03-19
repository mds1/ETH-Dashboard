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
          alt="cDAI logo"
          class="col-auto q-mr-sm main-header-image"
          src="statics/logos/cdai.png"
        >
        <div class="col-auto main-header">
          cDAI Supply Rate
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="text-caption text-center q-mt-sm">
          Total supplied: {{ formatCurrency(supply, false, 2, 2) }}
        </div>
        <div class="text-caption text-center">
          Total reserves: {{ formatCurrency(reserves, false, 2, 2) }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import mixinHelpers from 'src/utils/mixinHelpers';
import { categories, sources } from 'src/utils/metadata';

export default {
  name: 'DshCompoundCdaiSupply',

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.compound,
      title: 'cDAI Supply Stats',
      description: 'cDAI supply rate and total supplied',
      source: sources.compound,
    };
  },

  computed: {
    ...mapState({
      rate: (state) => state.main.data.compoundStats.cDAI.supplyRate,
      supply: (state) => state.main.data.compoundStats.cDAI.totalSupply,
      reserves: (state) => state.main.data.compoundStats.cDAI.totalReserves,
    }),
  },
};
</script>
