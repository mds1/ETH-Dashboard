<template>
  <div>
    <q-card class="main-card">
      <q-card-section class="main-card-section">
        <div class="main-value">
          {{ formatCurrency(totalDai, false, 2, 2) }}
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="main-header">
          Total Dai
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import mixinHelpers from 'src/utils/mixinHelpers';

export default {
  name: 'DaiStatsTotalDai',

  mixins: [mixinHelpers],

  computed: {
    ...mapState({
      totalDai: (state) => state.main.data.daiStats.debt,
    }),

    formattedTotalDai() {
      return this.formatCurrency(this.totalDai, false, 2, 2);
    },
  },
};
</script>
