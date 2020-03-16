<template>
  <q-layout view="hhh Lpr fff">
    <!-- COMPONENT SELECTION DIALOG -->
    <q-dialog
      v-model="showComponentSelection"
      @hide="saveComponents()"
    >
      <q-card class="q-px-md q-py-md">
        <!-- Title and Description-->
        <q-card-section class="text-center">
          <h4>
            Select Your Stats
          </h4>
          <div class="text-caption q-mt-md">
            Below is a list of all available stats. Please select the ones
            you would like to view. Your selection will be saved for
            your next visit.
          </div>
        </q-card-section>

        <q-card-section>
          <q-list style="margin-top: -1em;">
            <!-- Rendering a <label> tag (notice tag="label") so QCheckboxes
            will respond to clicks on QItems to change Toggle state. -->
            <div
              v-for="component in componentList"
              :key="component.id"
            >
              <h5
                v-if="component.isFirstInCategory"
                class="text-primary q-mt-md"
              >
                {{ component.category }}
              </h5>
              <q-item tag="label">
                <q-item-section
                  avatar
                  top
                >
                  <q-checkbox
                    v-model="selectedComponents[component.id]"
                    :val="true"
                    color="primary"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label style="font-size: 1.1em">
                    {{ component.name }}
                  </q-item-label>
                  <q-item-label style="opacity:0.7;">
                    {{ component.description }}. Source: {{ component.source }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-card-section>

        <!-- Close dialog -->
        <q-card-actions align="right">
          <q-btn
            v-close-popup
            color="primary"
            flat
            label="Ok"
            @click="saveComponents()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- HEADER -->
    <q-header
      class="q-mx-md q-mt-md"
      style="color: #000000; background-color: rgba(0,0,0,0)"
    >
      <div class="row justify-between items-center">
        <div class="col-auto">
          <!-- LOGO AND TITLE -->
          <div
            class="row justify-start items-center"
            style="cursor: pointer;"
          >
            <img
              alt="Ethereum logo"
              class="q-mx-md"
              src="statics/app-logo-128x128.png"
              style="max-width: 50px;"
            >
            <div class="text-h5 dark-toggle">
              ETH Dashboard
            </div>
          </div>
        </div>
        <!-- AUTO-UPDATE NOTICE -->
        <div class="col-auto dark-toggle text-center text-caption text-italic">
          Stats will automatically update each block. Use the icons to the right
          to show and hide components.
        </div>
        <!-- BLOCK NUMBER AND SETTINGS -->
        <div class="col-auto q-mr-md">
          <div class="text-caption dark-toggle">
            Block: {{ blockNumber }}
          </div>

          <div
            class="row justify-end q-mt-xs"
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
              class="col-auto dark-toggle q-ml-lg"
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
      <div class="row justify-center text-center items-center dark-toggle q-my-xl">
        <div
          class="text-caption"
          style="max-width: 800px;"
        >
          Built by
          <a
            href="https://twitter.com/msolomon44"
            target="_blank"
            class="hyperlink"
          >Matt Solomon</a>.
          <br><br>
          Thanks to
          <a
            href="https://twitter.com/nanexcool"
            target="_blank"
            class="hyperlink"
          >@nanexcool</a>
          for building
          <a
            href="https://daistats.com/"
            target="_blank"
            class="hyperlink"
          >Dai Stats</a>,
          where a lot of the code to fetch Dai and Maker stats
          was pulled from
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex';
import { componentList } from 'src/utils/components';

export default {
  name: 'BaseLayout',

  data() {
    return {
      showComponentSelection: false,
      componentList,
      selectedComponents: [],
    };
  },

  computed: {
    ...mapState({
      blockNumber: (state) => state.main.data.blockNumber,
      networkId: (state) => state.main.data.networkId,
    }),
  },

  created() {
    // Check local storage for a dark mode setting
    const isDark = this.$q.localStorage.getItem('isDark');
    this.$q.dark.set(isDark);
    // Check local storage for selected components
    this.selectedComponents = this.$q.localStorage.getItem('selectedComponents');
    // Initialize array of selected components
    if (!this.selectedComponents) {
      this.selectedComponents = (new Array(this.componentList.length)).fill(true);
    }
    this.$store.dispatch('main/setSelectedComponents', this.selectedComponents);
  },

  methods: {
    toggleNightMode() {
      const isDark = !this.$q.dark.isActive;
      this.$q.dark.set(isDark);
      this.$q.localStorage.set('isDark', isDark);
    },

    showSettings() {
      this.showComponentSelection = true;
    },

    saveComponents() {
      // Save to local storage
      this.$q.localStorage.set('selectedComponents', this.selectedComponents);
      // Update state
      this.$store.dispatch('main/setSelectedComponents', this.selectedComponents);
    },
  },
};
</script>
