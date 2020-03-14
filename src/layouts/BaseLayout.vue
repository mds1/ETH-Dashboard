<template>
  <q-layout view="hhh Lpr fff">
    <!-- HEADER -->
    <q-header
      class="q-mx-md q-mt-md"
      style="color: #000000; background-color: rgba(0,0,0,0)"
    >
      <div class="row justify-between items-center">
        <div class="col">
          <div
            class="row justify-start items-center"
            style="cursor: pointer;"
            @click="$router.push({ name: 'home' });"
          >
            <img
              alt="FakerDAO logo"
              class="q-mx-md"
              src="statics/app-logo-128x128.png"
              style="max-width: 50px;"
            >
            <div class="text-h5">
              ETH Dashboard
            </div>
          </div>
        </div>
        <div class="col-auto">
          <div class="row justify-between">
            <div class="text-caption q-mr-md">
              Block: TBD
            </div>
            <div>
              <q-icon name="fas fa-moon" />
            </div>
          </div>
          <div
            v-if="networkId !== '1'"
            class="text-bold"
            style="color:red"
          >
            Connect to the mainnet to use this app!
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
      <div class="row justify-center items-center q-my-xl">
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
      networkId: (state) => {
        if (state.auth && state.auth.provider && state.auth.provider.provider) {
          return state.auth.provider.provider.networkVersion;
        }
        return undefined;
      },
    }),
  },
};
</script>
