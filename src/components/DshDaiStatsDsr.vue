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
          {{ formatPercent(potFee, false, 2) }}
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="main-header">
          Dai Savings Rate
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
  name: 'DshDaiStatsDsr',

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.maker,
      title: 'Dai Savings Rate',
      description: 'Dai Savings Rate',
      source: sources.maker,
    };
  },

  computed: {
    ...mapState({
      potFee: (state) => state.main.data.daiStats.potFee,
    }),
  },
};
</script>
