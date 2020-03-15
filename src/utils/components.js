// List of components user can select from
export const componentList = [
  {
    category: 'Dai and MakerDAO Stats',
    componentName: 'DaiStatsTotalDai',
    description: 'Total amount of Dai in existence',
    id: 0,
    isFirstInCategory: true, // used for displaying headers
    name: 'Total Dai',
    source: 'Maker contracts',
  },
  {
    category: 'Dai and MakerDAO Stats',
    componentName: 'DaiStatsDaiPrice',
    description: 'Current price of Dai',
    id: 1,
    isFirstInCategory: false, // used for displaying headers
    name: 'Dai Price',
    source: 'Maker contracts',
  },
  {
    category: 'Dai and MakerDAO Stats',
    componentName: 'DaiStatsBatPrice',
    description: 'Current price of BAT',
    id: 2,
    isFirstInCategory: false, // used for displaying headers
    name: 'BAT Price',
    source: 'Maker contracts',
  },
  {
    category: 'Dai and MakerDAO Stats',
    componentName: 'DaiStatsEthPrice',
    description: 'Current price of Ether',
    id: 3,
    isFirstInCategory: false, // used for displaying headers
    name: 'Ether Price',
    source: 'Maker contracts',
  },
  {
    category: 'Dai and MakerDAO Stats',
    componentName: 'DaiStatsMkrPrice',
    description: 'Current price of Maker',
    id: 4,
    isFirstInCategory: false, // used for displaying headers
    name: 'Maker Price',
    source: 'Maker contracts',
  },
];
