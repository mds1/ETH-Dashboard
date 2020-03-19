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
          {{ formatCurrency(amount, true, 0, 0) }}
        </div>
      </q-card-section>

      <q-card-section class="main-card-section row justify-center items-center">
        <img
          alt="PoolTogether logo"
          class="col-auto q-mr-sm main-header-image"
          :src="`statics/logos/pooltogether.png`"
        >
        <div class="col-auto main-header">
          PoolTogether Next Prize
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="row justify-center items-center text-caption text-center q-mt-sm">
          Next drawing: {{ drawDate }}
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
  name: 'DshPoolTogetherDaiPrize',

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.poolTogether,
      title: 'PoolTogether Next Prize',
      description: 'Estimated prize value for the next drawing',
      source: sources.poolTogether,
    };
  },

  computed: {
    ...mapState({
      amount: (state) => state.main.data.poolTogether.dai.estimatedPrize,
      drawDate: (state) => {
        const drawDate = state.main.data.poolTogether.dai.prizeDrawingDate;
        return drawDate;
      },
    }),
  },
};
</script>
