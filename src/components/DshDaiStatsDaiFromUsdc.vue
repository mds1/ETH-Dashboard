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
          {{ formatCurrency(art * rate, false, 2, 2) }}
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="main-header">
          Dai From USDC
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
  name: 'DshDaiStatsDaiFromUsdc',

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.maker,
      title: 'Dai from USDC',
      description: 'Amount of Dai generated with USDC as collateral',
      source: sources.maker,
    };
  },

  computed: {
    ...mapState({
      art: (state) => state.main.data.daiStats.ilks[3].Art,
      rate: (state) => state.main.data.daiStats.ilks[3].rate,
    }),
  },
};
</script>
