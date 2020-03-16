<template>
  <div>
    <q-card class="main-card">
      <q-card-section class="main-card-section">
        <div class="text-caption main-caption">
          Source: {{ 'Maker contracts' }}
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

export default {
  name: 'DaiStatsSurplus',

  mixins: [mixinHelpers],

  computed: {
    ...mapState({
      sysSurplus: (state) => state.main.data.daiStats.sysSurplus,
      surplusBuffer: (state) => state.main.data.daiStats.surplusBuffer,
      surplusBump: (state) => state.main.data.daiStats.surplusBump,
    }),
  },
};
</script>
