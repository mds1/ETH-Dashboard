<template>
  <div class="full-height">
    <time-series-plot-generic
      :days="days"
      :source="source"
      :title="title"
      :field1="field1"
      :field2="field2"
      :y1-label="y1Label"
      @newDateRange="updateDays"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import mixinHelpers from 'src/utils/mixinHelpers';
import { categories, sources } from 'src/utils/metadata';
import TimeSeriesPlotGeneric from 'components/templates/TimeSeriesPlotGeneric';

export default {
  name: 'DshGlassnodeNonzeroAddresses',

  components: {
    TimeSeriesPlotGeneric,
  },

  mixins: [mixinHelpers],

  data() {
    return {
      // For menu
      category: categories.ethNetwork,
      title: 'Non-Zero Addresses',
      // eslint-disable-next-line
      description: 'The number of unique non-zero addresses holding a positive (non-zero) amount of Ether.',
      source: sources.glassnode,
      isFigureOrHistorical: true,
      // For component
      field1: 'addresses',
      field2: 'nonZeroAddresses',
      days: undefined,
      y1Label: 'Non-Zero Addresses',
    };
  },

  computed: {
    ...mapState({
      provider: (state) => state.main.provider,
      defaultDays: (state) => state.prefs.defaultDays,
    }),
  },

  async created() {
    this.days = this.defaultDays;
    await this.getData();
  },

  methods: {
    /**
     * @dev Updates how far in the past to get data from, denominated
     * in days back from today
     */
    async updateDays(value) {
      this.days = value;
      await this.getData();
    },

    async getData() {
      // Read data from database
      const doc = await this.$firestore.collection('data').doc('hourly').get();
      const data = doc.data();
      const { nonZeroAddresses } = data;

      // Only keep the data requested
      const days = this.days === 1 ? 2 : this.days; // use 2 if 24h since need 2 points for a line
      const values = nonZeroAddresses.slice(nonZeroAddresses.length - days); // works since glassnode currently has 24h interval on free plan
      this.$store.commit('main/setAddressField', { fieldname: this.field2, values });
    },
  },


};
</script>
