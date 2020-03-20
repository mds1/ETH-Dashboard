<template>
  <q-layout view="hhh Lpr fff">
    <!-- COMPONENT SELECTION DIALOG -->
    <q-dialog v-model="showComponentSelection">
      <q-card class="q-px-md q-py-md">
        <!-- Title and Description-->
        <q-card-section class="text-center">
          <h4 class="text-bold">
            Select Your Stats
          </h4>
          <div class="text-caption q-mt-md">
            Below is a list of all available stats. Please select the ones
            you would like to view. Your selection will be saved for
            your next visit.
          </div>
        </q-card-section>

        <q-card-section v-if="allComponents">
          <q-list style="margin-top: -1em;">
            <!-- Rendering a <label> tag (notice tag="label") so QCheckboxes
            will respond to clicks on QItems to change Toggle state. -->
            <div
              v-for="(component,index) in allComponents"
              :key="component.name"
            >
              <!-- Section header -->
              <h5
                v-if="index == 0 || component.data.category !== allComponents[index-1].data.category "
                class="text-primary q-mt-md"
              >
                {{ component.data.category }}
              </h5>
              <!-- Data with checkboxes -->
              <q-item tag="label">
                <q-item-section
                  avatar
                  top
                >
                  <q-checkbox
                    v-model="allComponentsLocal[index].isShown"
                    color="primary"
                    @input="setComponentSelections"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label style="font-size: 1.1em">
                    {{ component.data.title }}
                  </q-item-label>
                  <q-item-label style="opacity:0.7;">
                    {{ component.data.description }}
                    <br>
                    Source: {{ component.data.source }}
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
              Dashboard
            </div>
          </div>
        </div>
        <!-- AUTO-UPDATE NOTICE -->
        <div
          class="col-auto dark-toggle text-center text-caption text-italic"
          style="max-width:625px"
        >
          Data automatically updates each block. Use the icons to the right
          to configure settings. Components can be dragged to change the order.
          Visible components will be saved between visits, but order changes will not.
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

export default {
  name: 'BaseLayout',

  data() {
    return {
      showComponentSelection: false,
      allComponentsLocal: [],
    };
  },

  computed: {
    ...mapState({
      blockNumber: (state) => state.main.data.blockNumber,
      networkId: (state) => state.main.data.networkId,
      allComponents: (state) => state.prefs.allComponents,
    }),
  },

  created() {
    // Assign user selections
    this.allComponents.forEach((component) => {
      this.allComponentsLocal.push(component);
    });
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

    setComponentSelections() {
      this.$store.dispatch('prefs/setComponentSelections', this.allComponentsLocal);
    },
  },
};
</script>
