<template>
  <div class="full-height">
    <compound-borrow
      token-symbol="cDAI"
      :source="source"
    />
  </div>
</template>

<script>
import mixinHelpers from 'src/utils/mixinHelpers';
import { categories, sources } from 'src/utils/metadata';
import CompoundBorrow from 'components/templates/CompoundBorrow';

export default {
  name: 'DshCompoundCdaiBorrow',

  components: {
    CompoundBorrow,
  },

  mixins: [mixinHelpers],

  data() {
    return {
      category: categories.compound,
      title: 'cDAI Borrow Stats',
      description: 'cDAI borrow rate and total borrowed',
      source: sources.compound,
    };
  },
};
</script>
