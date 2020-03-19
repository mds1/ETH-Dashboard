<template>
  <div class="full-height">
    <compound-supply
      token-symbol="cDAI"
      :source="source"
    />
  </div>
</template>

<script>
import mixinHelpers from 'src/utils/mixinHelpers';
import { categories, sources } from 'src/utils/metadata';
import CompoundSupply from 'components/templates/CompoundSupply';

export default {
  name: 'DshCompoundCdaiSupply',

  components: {
    CompoundSupply,
  },

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.compound,
      title: 'cDAI Supply Stats',
      description: 'cDAI supply rate and total supplied',
      source: sources.compound,
    };
  },
};
</script>
