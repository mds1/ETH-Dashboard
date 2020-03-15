<template>
  <q-page padding>
    <!-- MAIN CONTENT -->
    <div class="row justify-center">
      Stuff
    </div>
    <div class="row justify-center">
      <dai-stats-total-dai class="col-auto" />
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
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
    };
  },

  computed: {
    ...mapState({
    }),

  },
};
</script>
