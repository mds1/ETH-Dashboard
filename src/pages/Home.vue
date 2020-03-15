<template>
  <q-page padding>
    <!-- MAIN CONTENT -->
    <div class="row justify-center">
      Stuff
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HomePage',

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
