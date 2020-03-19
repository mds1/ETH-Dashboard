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
import { categories, sources } from 'src/utils/metadata';

export default {
  name: 'DshDaiStatsTotalDai',

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.maker,
      title: 'Total Dai',
      description: 'Total amount of Dai in existence',
      source: sources.maker,
    };
  },

  computed: {
    ...mapState({
      totalDai: (state) => state.main.data.daiStats.debt,
    }),
  },
};
</script>
