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
          {{ formatPercent(dailyRate, false, 2) }} APY
        </div>
      </q-card-section>

      <q-card-section class="main-card-section row justify-center items-center">
        <img
          alt="Curve logo"
          class="col-auto q-mr-sm main-header-image"
          src="statics/logos/curve.png"
        >
        <div class="col-auto main-header">
          Curve {{ poolName }} Liquidity<br>Provider Rate
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="text-caption text-center q-mt-sm">
          {{ formatPercent(weeklyRate, false, 2) }} Weekly APY
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import mixinHelpers from 'src/utils/mixinHelpers';

export default {
  name: 'TemplateCurveApy',

  mixins: [mixinHelpers],

  props: {
    source: {
      type: String,
      required: true,
    },

    poolName: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState({
      dailyRate(state) {
        return state.main.data.curve[this.poolName.toLowerCase()].dailyApr;
      },
      weeklyRate(state) {
        return state.main.data.curve[this.poolName.toLowerCase()].weeklyApr;
      },
    }),
  },
};
</script>
