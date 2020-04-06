<template>
  <div class="full-height">
    <time-series-plot-price-history
      :days="days"
      :source="source"
      :title="title"
      :token-symbol="tokenSymbol"
      :y1-label="y1Label"
      y1-prefix="$"
      @newDateRange="updateDays"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import mixinHelpers from 'src/utils/mixinHelpers';
import { categories, sources } from 'src/utils/metadata';
import TimeSeriesPlotPriceHistory from 'components/templates/TimeSeriesPlotPriceHistory';

export default {
  name: 'DshCoinGeckoPriceHistoryMkr',

  components: {
    TimeSeriesPlotPriceHistory,
  },

  mixins: [mixinHelpers],

  data() {
    return {
      // For menu
      category: categories.tokenPrices,
      title: 'MKR Price History',
      description: 'Historical price data for Maker',
      source: sources.coinGecko,
      isFigureOrHistorical: true,
      // For component
      coin: 'maker',
      days: undefined,
      tokenSymbol: 'MKR',
      y1Label: 'MKR price',
    };
  },

  computed: {
    ...mapState({
      provider: (state) => state.main.provider,
      defaultDays: (state) => state.prefs.defaultDays,
    }),
  },

  created() {
    this.days = this.defaultDays;
    this.getData();
    // Update data every few minutes
    setInterval(() => {
      this.getData();
    }, 5 * 60 * 1000); // every 5 minutes
  },

  methods: {
    /**
     * @dev Updates how far in the past to get data from, denominated
     * in days back from today
     */
    updateDays(value) {
      this.days = value;
      this.getData();
    },

    async getData() {
      const payload = {
        tokenName: this.coin,
        tokenSymbol: this.tokenSymbol,
        days: this.days,
      };
      this.$store.dispatch('main/getTokenHistoricalPrices', payload);
    },
  },


};
</script>
