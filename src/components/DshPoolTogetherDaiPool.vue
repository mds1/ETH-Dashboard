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
          PoolTogether Total Dai
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="row justify-center items-center text-caption text-center q-mt-sm">
          Sponsored:
          {{ formatCurrency(sponsored, true, 0, 0) }}
          ({{ formatPercent(100 * sponsored / amount, false, 2) }})
          <tool-tip
            message="Sponsored amounts are money that is in the pool
          and contributes interest to the prize but is NOT eligible to win.
          Sponsorship is provided by individuals and crypto companies that
          want to help grow the ecosystem."
          />
        </div>
        <div class="text-caption text-center">
          Open:
          {{ formatCurrency(open, true, 0, 0) }}
          ({{ formatPercent(100 * open / amount, false, 2) }})
          <tool-tip
            message="Open amounts are money that is in the pool
          and not eligible to win in the next drawing based on when
          it was deposited. Open amounts will become eligible to win in
          the next drawing."
          />
        </div>
        <div class="text-caption text-center">
          Eligible:
          {{ formatCurrency(eligible, true, 0, 0) }}
          ({{ formatPercent(100 * eligible / amount, false, 2) }})
          <tool-tip
            message="Eligile amounts are money that is in the pool
          and eligible to win in the upcoming drawing."
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import mixinHelpers from 'src/utils/mixinHelpers';
import { categories, sources } from 'src/utils/metadata';
import ToolTip from 'components/templates/ToolTip';

export default {
  name: 'DshPoolTogetherDaiPool',

  components: { ToolTip },

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.poolTogether,
      title: 'PoolTogether Pool Stats',
      description: 'Breakdown of money currently in the pool',
      source: sources.poolTogether,
    };
  },

  computed: {
    ...mapState({
      amount: (state) => state.main.data.poolTogether.dai.totalEarningInterest,
      sponsored: (state) => state.main.data.poolTogether.dai.sponsored,
      open: (state) => state.main.data.poolTogether.dai.openTickets,
      eligible: (state) => state.main.data.poolTogether.dai.eligibleTickets,
    }),
  },
};
</script>
