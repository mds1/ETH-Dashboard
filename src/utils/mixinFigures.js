/**
 * Mixin for providing data for plots and figures
 */
import { mapState } from 'vuex';
import range from 'lodash/range'; // https://lodash.com/docs/4.17.11#range
import merge from 'lodash/merge'; // https://lodash.com/docs/4.17.11#merge

export default {

  data() {
    return {
      colors: {
        // Default plotly colors, sourced from https://stackoverflow.com/a/44727682
        blue: '#1f77b4', // muted blue
        orange: '#ff7f0e', // safety orange
        green: '#2ca02c', // cooked asparagus green
        red: '#d62728', // brick red
        purple: '#9467bd', // muted purple
        brown: '#8c564b', // chestnut brown
        pink: '#e377c2', // raspberry yogurt pink
        gray: '#7f7f7f', // middle gray
        yellowGreen: '#bcbd22', // curry yellow-green
        blueTeal: '#17becf', // blue-teal
        black: '#000000', // black
        primary: '#1976D2',
        secondary: '#BBDEFB',
        accent: '#03A9F4',
        darkprimary: '#2196F3',
        dark: '#1D1D1D',
        light: '#E2E2E2',
        griddark: '#ffffff11',
        gridlight: '#00000011',
      },

      lineSettings: {
        // Settings for line plots
        line: { width: 2 },
      },
    };
  },

  computed: {
    ...mapState({
      isDark(state) {
        return state.prefs.isDark;
      },
    }),

    fontColor() {
      return this.isDark ? this.colors.light : this.colors.dark;
    },

    gridColor() {
      return this.isDark ? this.colors.griddark : this.colors.gridlight;
    },

    layout() {
      return {
        // Set transparent background
        paper_bgcolor: '#ffffff00',
        plot_bgcolor: '#ffffff00',
        // x-axis properties
        xaxis: {
          gridcolor: this.gridColor,
          gridwidth: 1,
          color: this.fontColor,
        },
        // y-axis properties
        yaxis: {
          // automargin: true,
          gridcolor: this.gridColor,
          gridwidth: 1,
          color: this.fontColor,
        },
        yaxis2: {
          // automargin: true,
          gridcolor: this.gridColor,
          gridwidth: 1,
          color: this.fontColor,
        },
        // configure plot margins
        // values are chosen to prevent axis labels from being cut off
        margin: {
          l: 45,
          r: 18,
          b: 60,
          t: 10,
          pad: 5,
        },
        hoverlabel: {
          namelength: 100,
        },
        legend: {
          orientation: 'h',
          font: {
            color: this.fontColor,
          },
          // x: 0.55,
          // y: 1,
          // bgcolor: this.colors.background,
          // borderwidth: 1,
        },
      };
    },
  },

  methods: {
    // Used to generate x-axis ranges
    range,

    // =========================================================================
    //              Custom Plotly methods to merge default settings
    // =========================================================================
    mergeLayout(layout) {
      return merge(layout, this.layout);
    },

    prepareLinePlot(data, layout) {
      // For each data source, merge the settings
      const finalData = [];
      for (let i = 0; i < data.length; i += 1) {
        finalData[i] = merge(data[i], this.lineSettings);
      }
      // Merge layout settings
      const finalLayout = this.mergeLayout(layout);
      // Return updated objects
      return { finalData, finalLayout };
    },

    linspace(startValue, stopValue, cardinality) {
      // Generate linearly spaced numbers
      // https://stackoverflow.com/questions/40475155/does-javascript-have-a-method-that-returns-an-array-of-numbers-based-on-start-s
      const arr = [];
      const currValue = startValue;
      const step = (stopValue - startValue) / (cardinality - 1);
      for (let i = 0; i < cardinality; i += 1) {
        arr.push(currValue + (step * i));
      }
      return arr;
    },
  },
};
