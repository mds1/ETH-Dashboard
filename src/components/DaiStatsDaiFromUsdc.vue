<template>
  <div class="full-height">
    <q-card class="main-card full-height">
      <q-card-section class="main-card-section">
        <div class="text-caption main-caption">
          Source: {{ 'Maker contracts' }}
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

export default {
  name: 'DaiStatsDaiFromUsdc',

  mixins: [mixinHelpers],

  computed: {
    ...mapState({
      art: (state) => state.main.data.daiStats.ilks[3].Art,
      rate: (state) => state.main.data.daiStats.ilks[3].rate,
    }),
  },
};
</script>
