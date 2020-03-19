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
          {{ formatCurrency(sysSurplus, false, 2, 2) }}
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="main-header">
          System Surplus
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="text-caption text-center">
          Surplus Buffer: {{ formatCurrency(surplusBuffer, false, 0, 0) }}
        </div>
        <div class="text-caption text-center">
          Lot: {{ formatCurrency(surplusBump, false, 0, 0) }}
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
  name: 'DshDaiStatsSurplus',

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.maker,
      title: 'System Surplus',
      description: 'System surplus, measured in Dai',
      source: sources.maker,
    };
  },

  computed: {
    ...mapState({
      sysSurplus: (state) => state.main.data.daiStats.sysSurplus,
      surplusBuffer: (state) => state.main.data.daiStats.surplusBuffer,
      surplusBump: (state) => state.main.data.daiStats.surplusBump,
    }),
  },
};
</script>
