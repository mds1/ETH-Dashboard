<template>
  <div class="full-height">
    <q-card class="main-card full-height">
      <q-card-section class="main-card-section">
        <div class="text-caption main-caption">
          Source: {{ source }}
        </div>
      </q-card-section>

      <q-card-section class="main-card-section">
        <div class="row justify-start">
          <q-btn
            :color="days === 1 ? 'primary' : 'secondary'"
            class="q-mr-sm"
            dense
            flat
            label="24h"
            no-caps
            @click="newDateRange(1)"
          />
          <q-btn
            :color="days === 7 ? 'primary' : 'secondary'"
            class="q-mr-sm"
            dense
            flat
            label="7d"
            no-caps
            @click="newDateRange(7)"
          />
          <q-btn
            :color="days === 30 ? 'primary' : 'secondary'"
            class="q-mr-sm"
            dense
            flat
            label="30d"
            no-caps
            @click="newDateRange(30)"
          />
          <q-btn
            :color="days === 60 ? 'primary' : 'secondary'"
            class="q-mr-sm"
            dense
            flat
            label="60d"
            no-caps
            @click="newDateRange(60)"
          />
          <q-btn
            :color="days === 90 ? 'primary' : 'secondary'"
            class="q-mr-sm"
            dense
            flat
            label="90d"
            no-caps
            @click="newDateRange(90)"
          />
          <q-btn
            :color="days === 180 ? 'primary' : 'secondary'"
            class="q-mr-sm"
            dense
            flat
            label="180d"
            no-caps
            @click="newDateRange(180)"
          />
          <q-btn
            :color="days === 365 ? 'primary' : 'secondary'"
            class="q-mr-sm"
            dense
            flat
            label="1y"
            no-caps
            @click="newDateRange(365)"
          />
          <q-btn
            :color="days === 'max' ? 'primary' : 'secondary'"
            dense
            flat
            label="Max"
            no-caps
            @click="newDateRange('max')"
          />
        </div>
        <div
          :id="divId"
          style="margin-top: -0rem; z-index:1;"
        />
      </q-card-section>

      <q-card-section class="main-card-section row justify-center items-center">
        <div class="col-auto main-header">
          {{ title }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import mixinFigures from 'src/utils/mixinFigures';
import mixinHelpers from 'src/utils/mixinHelpers';
import { categories, sources } from 'src/utils/metadata';

export default {
  name: 'DshGlassnodeBalanceAboveXAddresses',

  mixins: [mixinFigures, mixinHelpers],

  data() {
    return {
      // For menu
      category: categories.ethNetwork,
      title: 'Addresses With Balance of At Least X ETH',
      // eslint-disable-next-line
      description: 'The number of unique addresses holding at least X Ether, where X is shown for values of 0, 0.01, 0.1, 1, 10, 100, 1k, and 10k.',
      source: sources.glassnode,
      isFigureOrHistorical: true,
      // For component
      days: 'max',
      y1Label: 'Addresses Count',
      divId: 'balanceAboveX',
    };
  },

  computed: {
    ...mapState({
      /* eslint-disable no-underscore-dangle */
      nonZeroAddresses: (state) => state.main.data.addresses.nonZeroAddresses,
      pointZero1Addresses: (state) => state.main.data.addresses.pointZero1Addresses,
      point1Addresses: (state) => state.main.data.addresses.point1Addresses,
      _1Addresses: (state) => state.main.data.addresses._1Addresses,
      _10Addresses: (state) => state.main.data.addresses._10Addresses,
      _100Addresses: (state) => state.main.data.addresses._100Addresses,
      _1kAddresses: (state) => state.main.data.addresses._1kAddresses,
      _10kAddresses: (state) => state.main.data.addresses._10kAddresses,
    }),
  },

  watch: {
    nonZeroAddresses() { this.generateFigure(); },
    pointZero1Addresses() { this.generateFigure(); },
    point1Addresses() { this.generateFigure(); },
    _1Addresses() { this.generateFigure(); },
    _10Addresses() { this.generateFigure(); },
    _100Addresses() { this.generateFigure(); },
    _1kAddresses() { this.generateFigure(); },
    _10kAddresses() { this.generateFigure(); },
  },

  mounted() {
    this.generateFigure();
  },

  methods: {
    newDateRange(val) {
      this.days = val;
      this.generateFigure();
    },

    generateFigure() {
      const mapAndFilter = (array, key, days, isSec) => {
        // Setup
        if (!array) return undefined;
        const nVals = array.length;
        let map;
        // Filter
        if (isSec) map = array.map((item) => item[key] * 1000);
        else map = array.map((item) => item[key]);
        // Get values
        if (days === 'max') return map;
        const vals = map.filter((val, index) => index >= nVals - days);
        return vals;
      };
      const trace1 = {
        x: mapAndFilter(this.nonZeroAddresses, 't', this.days, true),
        y: mapAndFilter(this.nonZeroAddresses, 'v', this.days, false),
        type: 'scatter',
        mode: 'lines',
        name: '> 0 ETH',
        marker: {
          color: this.colors.primary,
        },
      };
      const trace2 = {
        x: mapAndFilter(this.pointZero1Addresses, 't', this.days, true),
        y: mapAndFilter(this.pointZero1Addresses, 'v', this.days, false),
        type: 'scatter',
        mode: 'lines',
        name: '≥ 0.01 ETH',
        marker: {
          color: this.colors.orange,
        },
      };
      const trace3 = {
        x: mapAndFilter(this.point1Addresses, 't', this.days, true),
        y: mapAndFilter(this.point1Addresses, 'v', this.days, false),
        type: 'scatter',
        mode: 'lines',
        name: '≥ 0.1 ETH',
        marker: {
          color: this.colors.green,
        },
      };
      const trace4 = {
        x: mapAndFilter(this._1Addresses, 't', this.days, true),
        y: mapAndFilter(this._1Addresses, 'v', this.days, false),
        type: 'scatter',
        mode: 'lines',
        name: '≥ 1 ETH',
        marker: {
          color: this.colors.red,
        },
      };
      const trace5 = {
        x: mapAndFilter(this._10Addresses, 't', this.days, true),
        y: mapAndFilter(this._10Addresses, 'v', this.days, false),
        type: 'scatter',
        mode: 'lines',
        name: '≥ 10 ETH',
        marker: {
          color: this.colors.purple,
        },
      };
      const trace6 = {
        x: mapAndFilter(this._100Addresses, 't', this.days, true),
        y: mapAndFilter(this._100Addresses, 'v', this.days, false),
        type: 'scatter',
        mode: 'lines',
        name: '≥ 100 ETH',
        marker: {
          color: this.colors.brown,
        },
      };
      const trace7 = {
        x: mapAndFilter(this._1kAddresses, 't', this.days, true),
        y: mapAndFilter(this._1kAddresses, 'v', this.days, false),
        type: 'scatter',
        mode: 'lines',
        name: '≥ 1k ETH',
        marker: {
          color: this.colors.pink,
        },
      };
      const trace8 = {
        x: mapAndFilter(this._10kAddresses, 't', this.days, true),
        y: mapAndFilter(this._10kAddresses, 'v', this.days, false),
        type: 'scatter',
        mode: 'lines',
        name: '≥ 10k ETH',
        marker: {
          color: this.colors.grey,
        },
      };

      const layout = {
        height: 200,
        width: 355,
        // title: 'Account Value Over Time',
        xaxis: {
          title: 'Date',
          type: 'date',
          zeroline: false,
          // color: 'ffffff',
        },
        yaxis: {
          // title: 'Something',
          tickprefix: this.y1Prefix,
          hoverformat: this.hoverformat,
        },
        legend: {
          x: 0,
          y: 1.2,
          font: {
            size: 9,
          },
        },
        showlegend: true,
        font: {
          color: '#000000cc',
        },
      };

      const data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8];
      const { finalData, finalLayout } = this.prepareLinePlot(data, layout);
      this.$Plotly.newPlot(`${this.divId}`, finalData, finalLayout, { responsive: true });
    },
  },
};
</script>
