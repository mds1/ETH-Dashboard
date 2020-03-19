<template>
  <div class="full-height">
    <compound-borrow
      token-symbol="cUSDC"
      :source="source"
    />
  </div>
</template>

<script>
import mixinHelpers from 'src/utils/mixinHelpers';
import { categories, sources } from 'src/utils/metadata';
import CompoundBorrow from 'components/templates/CompoundBorrow';

export default {
  name: 'DshCompoundCusdcBorrow',

  components: {
    CompoundBorrow,
  },

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.compound,
      title: 'cUSDC Borrow Stats',
      description: 'cUSDC borrow rate and total borrowed',
      source: sources.compound,
    };
  },
};
</script>
