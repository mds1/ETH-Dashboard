<template>
  <q-layout view="hhh Lpr fff">
    <!-- HEADER -->
    <q-header
      class="q-mx-md q-mt-md"
      style="color: #000000; background-color: rgba(0,0,0,0)"
    >
      <div class="row justify-between items-center">
        <div class="col-auto">
          <div
            class="row justify-start items-center"
            style="cursor: pointer;"
          >
            <img
              alt="FakerDAO logo"
              class="q-mx-md"
              src="statics/app-logo-128x128.png"
              style="max-width: 50px;"
            >
            <div class="text-h5 dark-toggle">
              ETH Dashboard
            </div>
          </div>
        </div>
        <div class="col-auto q-mr-md">
          <div class="text-caption dark-toggle">
            Block: {{ blockNumber }}
          </div>
          <div
            v-if="networkId !== '1'"
            class="text-bold"
            style="color:red"
          >
            Connect to the mainnet to use this app!
          </div>
          <div
            v-else
            class="row justify-between q-mt-xs"
          >
            <q-icon
              v-if="!$q.dark.isActive"
              class="col-auto dark-toggle"
              name="fas fa-moon"
              style="cursor: pointer;"
              @click="toggleNightMode()"
            />
            <q-icon
              v-else
              class="col-auto dark-toggle"
              name="fas fa-sun"
              style="cursor: pointer;"
              @click="toggleNightMode()"
            />
            <q-icon
              class="col-auto dark-toggle"
              name="fas fa-cog"
              style="cursor: pointer;"
              @click="showSettings()"
            />
          </div>
        </div>
      </div>
    </q-header>
    <!-- MAIN CONTENT -->
    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- FOOTER -->
    <q-footer
      bordered
      class="q-mt-xl"
      style="color: #000000; background-color: rgba(0,0,0,0)"
    >
      <div class="row justify-center items-center dark-toggle q-my-xl">
        <div
          class="text-caption"
          style="max-width: 800px;"
        >
          Built by
          <a
            href="https://twitter.com/msolomon44"
            target="_blank"
            class="hyperlink"
          >Matt Solomon</a>
          of
          <a
            href="https://beta.floatify.net"
            target="_blank"
            class="hyperlink"
          >Floatify</a>.
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BaseLayout',

  computed: {
    ...mapState({
      blockNumber: (state) => state.main.data.blockNumber,
      networkId: (state) => state.main.data.networkId,
    }),
  },

  methods: {
    toggleNightMode() {
      this.$q.dark.set(!this.$q.dark.isActive);
    },

    showSettings() {
      alert('Settings not yet implemented');
    },
  },
};
</script>
