<template>
  <div class="full-height">
    <compound-supply
      token-symbol="cUSDC"
      :source="source"
    />
  </div>
</template>

<script>
import mixinHelpers from 'src/utils/mixinHelpers';
import { categories, sources } from 'src/utils/metadata';
import CompoundSupply from 'components/templates/CompoundSupply';

export default {
  name: 'DshCompoundCusdcSupply',

  components: {
    CompoundSupply,
  },

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.compound,
      title: 'cUSDC Supply Stats',
      description: 'cUSDC supply rate and total supplied',
      source: sources.compound,
    };
  },
};
</script>
