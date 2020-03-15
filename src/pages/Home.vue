<template>
  <q-page padding>
    <!-- MAIN CONTENT -->
    <div class="row justify-center q-mt-xl">
      <div
        v-for="component in componentsToShow"
        :key="component.id"
        class="col-auto q-mx-md"
      >
        <component :is="component.componentName" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import { componentList } from 'src/utils/components';
import DaiStatsTotalDai from 'components/DaiStatsTotalDai';
import DaiStatsDaiPrice from 'components/DaiStatsDaiPrice';

export default {
  name: 'HomePage',

  components: {
    DaiStatsTotalDai,
    DaiStatsDaiPrice,
  },

  data() {
    return {
      now: undefined,
      showMkrDialog: false,
      showWethDialog: false,
      componentList,
    };
  },

  computed: {
    ...mapState({
      // Array of booleans as to whether or not to show each component
      selectedComponents: (state) => state.main.selectedComponents,
    }),

    componentsToShow() {
      if (!this.selectedComponents) return undefined;
      return this.componentList.filter((component, index) => this.selectedComponents[index]);
    },

  },
};
</script>
