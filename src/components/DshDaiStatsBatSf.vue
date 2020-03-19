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
          {{ formatPercent(batFee, false, 2) }}
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="main-header">
          BAT Stability Fee
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
  name: 'DshDaiStatsBatSf',

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.maker,
      title: 'BAT Stability Fee',
      description: 'BAT Stability Fee',
      source: sources.maker,
    };
  },

  computed: {
    ...mapState({
      batFee: (state) => state.main.data.daiStats.batFee,
    }),
  },
};
</script>
