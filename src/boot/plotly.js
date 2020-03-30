// Plotly setup instructions from https://github.com/plotly/plotly.js
import Plotly from 'plotly.js-dist';

// "async" is optional
export default async ({ Vue /* app, router, ... */ }) => {
  Vue.prototype.$Plotly = Plotly;
};
