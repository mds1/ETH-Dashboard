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
  name: 'DshGlassnodeGini',

  mixins: [mixinFigures, mixinHelpers],

  data() {
    return {
      // For menu
      category: categories.ethNetwork,
      title: 'Gini Coefficient',
      // eslint-disable-next-line
      description: 'For various tokens, shows the gini coefficient for the distribution of coins over addresses. Smart contract addresses, exchange addresses and other special asset-specific addresses (e.g. team fund addresses) are excluded for the computation of the gini.',
      source: sources.glassnode,
      isFigureOrHistorical: true,
      // For component
      days: 'max',
      y1Label: 'Percent',
      divId: 'gini',
    };
  },

  computed: {
    ...mapState({
      /* eslint-disable no-underscore-dangle */
      giniDai: (state) => state.main.data.glassnode.giniDai,
      giniUsdc: (state) => state.main.data.glassnode.giniUsdc,
      giniUsdt: (state) => state.main.data.glassnode.giniUsdt,
      giniBat: (state) => state.main.data.glassnode.giniBat,
      giniMkr: (state) => state.main.data.glassnode.giniMkr,
    }),
  },

  watch: {
    giniDai() { this.generateFigure(); },
    giniUsdc() { this.generateFigure(); },
    giniUsdt() { this.generateFigure(); },
    giniBat() { this.generateFigure(); },
    giniMkr() { this.generateFigure(); },
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
        days += 1;
        const vals = map.filter((val, index) => index >= nVals - days);
        return vals;
      };
      const trace1 = {
        x: mapAndFilter(this.giniDai, 't', this.days, true),
        y: mapAndFilter(this.giniDai, 'v', this.days, false),
        type: 'scatter',
        mode: 'lines',
        name: 'DAI',
        marker: {
          color: this.colors.primary,
        },
      };
      const trace2 = {
        x: mapAndFilter(this.giniUsdc, 't', this.days, true),
        y: mapAndFilter(this.giniUsdc, 'v', this.days, false),
        type: 'scatter',
        mode: 'lines',
        name: 'USDC',
        marker: {
          color: this.colors.orange,
        },
      };
      const trace3 = {
        x: mapAndFilter(this.giniUsdt, 't', this.days, true),
        y: mapAndFilter(this.giniUsdt, 'v', this.days, false),
        type: 'scatter',
        mode: 'lines',
        name: 'USDT',
        marker: {
          color: this.colors.green,
        },
      };
      const trace4 = {
        x: mapAndFilter(this.giniMkr, 't', this.days, true),
        y: mapAndFilter(this.giniMkr, 'v', this.days, false),
        type: 'scatter',
        mode: 'lines',
        name: 'MKR',
        marker: {
          color: this.colors.red,
        },
      };
      const trace5 = {
        x: mapAndFilter(this.giniBat, 't', this.days, true),
        y: mapAndFilter(this.giniBat, 'v', this.days, false),
        type: 'scatter',
        mode: 'lines',
        name: 'BAT',
        marker: {
          color: this.colors.purple,
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
          hoverformat: '0.2f',
          // ticksuffix: '%',
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

      const data = [trace1, trace2, trace3, trace4, trace5];
      const { finalData, finalLayout } = this.prepareLinePlot(data, layout);
      this.$Plotly.newPlot(`${this.divId}`, finalData, finalLayout, { responsive: true });
    },
  },
};
</script>
