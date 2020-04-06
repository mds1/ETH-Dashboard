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
        <img
          :alt="`${tokenSymbol.toLowerCase()} logo`"
          class="col-auto q-mr-sm main-header-image"
          :src="`statics/logos/${tokenSymbol.toLowerCase()}.png`"
        >
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

export default {
  name: 'TemplateTimeSeriesPlotPriceHistory',

  mixins: [mixinFigures, mixinHelpers],

  props: {
    days: {
      type: undefined, // number, or string for 'max'
      required: true,
    },

    source: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    tokenSymbol: {
      type: String,
      required: true,
    },

    y1Label: {
      type: String,
      required: true,
    },

    y2Label: {
      type: String,
      required: false,
      default: '',
    },

    y1Prefix: {
      type: String,
      required: false,
      default: '',
    },

    y2Prefix: {
      type: String,
      required: false,
      default: '',
    },
  },

  computed: {
    ...mapState({
      // blockNumber: (state) => state.main.data.blockNumber,
      priceData(state) {
        return state.main.data.tokenPriceHistory[this.tokenSymbol.toLowerCase()];
      },
    }),

    divId() {
      return `figure-${this.tokenSymbol}`;
    },
  },

  watch: {
    priceData() {
      this.generateFigure();
    },
  },

  mounted() {
    this.generateFigure();
  },

  methods: {
    /**
     * @dev Emit event to parent component with a new date range, denominated
     * in days back from today, or 'max' for as much as possible
     */
    newDateRange(val) {
      this.$emit('newDateRange', val);
    },

    generateFigure() {
      const x = this.priceData.map((item) => item[0]);
      const y = this.priceData.map((item) => item[1]);
      const trace1 = {
        x,
        y,
        type: 'scatter',
        mode: 'lines',
        name: this.y1Label,
        marker: {
          color: this.colors.primary,
        },
      };

      let trace2 = {};
      if (this.y2 && false) { // temporarily do not use
        trace2 = {
          x: this.x,
          y: this.y2,
          type: 'scatter',
          mode: 'lines',
          name: this.y2Label,
          marker: {
            color: this.colors.orange,
          },
          yaxis: 'y2',
        };
      }

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
          hoverformat: ',.4f',
        },
        yaxis2: {
          // title: 'Something',
          tickprefix: this.y2Prefix,
          // hoverformat: ',.0f',
          overlaying: 'y',
          side: 'right',
        },
        legend: {
          x: 0.05,
          y: 1,
          bgcolor: this.colors.background,
          borderwidth: 1,
        },
        showlegend: false,
        font: {
          color: '#000000cc',
          // family: 'Roboto Slab',
        },
      };

      const data = [trace1, trace2];
      const { finalData, finalLayout } = this.prepareLinePlot(data, layout);
      this.$Plotly.newPlot(`${this.divId}`, finalData, finalLayout, { responsive: true });
    },
  },
};
</script>
