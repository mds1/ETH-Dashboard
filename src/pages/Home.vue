<template>
  <q-page padding>
    <!-- MAIN CONTENT -->
    <div class="row justify-center">
      Stuff
    </div>
    <div class="row justify-center">
      <div
        v-for="component in componentsToShow"
        :key="component.id"
        class="col-auto"
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

export default {
  name: 'HomePage',

  components: {
    DaiStatsTotalDai,
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
