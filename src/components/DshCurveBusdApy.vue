<template>
  <div class="full-height">
    <curve-apy
      pool-name="bUSD"
      :source="source"
    />
  </div>
</template>

<script>
import mixinHelpers from 'src/utils/mixinHelpers';
import { categories, sources } from 'src/utils/metadata';
import CurveApy from 'components/templates/CurveApy';

export default {
  name: 'DshCurveBusdApy',

  components: {
    CurveApy,
  },

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.curve,
      title: 'Curve bUSD APY',
      description: `Average APY for the past 24 hours and average APY for the
        past week when supplying to Curve's bUSD liquidity pool.`,
      source: sources.curve,
    };
  },
};
</script>
