<template>
  <q-page padding>

    <!-- MAIN CONTENT -->
    <h1 class="text-center">
      FakerDAO
    </h1>
    <div
      class="row justify-center"
      style="max-width: 400px; margin: 0 auto; margin-top: -3em;"
    >
      <div class="col-auto q-mx-md q-my-xs">
        <span class="text-bold">Current Phase:</span> {{ currentPhase }}
      </div>
      <div class="col-auto q-mx-md q-my-xs">
        <span class="text-bold">Next Phase:</span> {{ nextPhase }}
      </div>

      <div class="col-auto q-mx-md q-my-xs">
        <span class="text-bold">Date Next Phase Stars:</span> {{ dateNextPhaseStarts }}
      </div>

      <div class="col-auto q-mx-md q-my-xs">
        <span class="text-bold">Time Until Next Phase:</span> {{ timeUntilNextPhase }}
      </div>
    </div>

    <div class="row justify-center q-mt-lg">
      <div class="col-auto">
        <!-- DEPOSIT -->
        <div
          v-if="isShift"
          class="text-caption live-now q-ml-md "
          @click="showMkrDialog=true"
        >
          Live now for anyone!
        </div>
        <div v-else>
          <!-- Blank line to ensure proper spacing/alignment -->
          <br>
        </div>
        <q-card
          bordered
          class="col-auto card-border q-ma-md"
          style="max-width: 400px"
          @click="navigateToPage('deposit')"
        >
          <q-card-section>
            <div class="text-h6">
              Deposit MKR
            </div>
            <div class="text-subtitle2">
              Got MKR you're not using for voting? Auction its voting power and make some money
            </div>
          </q-card-section>
          <q-separator
            inset
            color="primary"
          />
          <q-card-section>
            <div>
              You have {{ formattedUserMkrBalance }} MKR to deposit
            </div>
          </q-card-section>
        </q-card>
        <div
          class="hyperlink text-caption need-help q-ml-md "
          @click="showMkrDialog=true"
        >
          Need MKR?
        </div>
      </div>

      <!-- BID -->
      <div class="col-auto">
        <div
          v-if="isAuction"
          class="text-caption live-now q-ml-md "
          @click="showMkrDialog=true"
        >
          Live now for anyone! Leading bid: {{ leadingBidAmount }} WETH
        </div>
        <div v-else>
          <!-- Blank line to ensure proper spacing/alignment -->
          <br>
        </div>
        <q-card
          bordered
          class="col-auto card-border q-ma-md"
          style="max-width: 400px"
          @click="navigateToPage('bid')"
        >
          <q-card-section>
            <div class="text-h6">
              Bid on MKR
            </div>
            <div class="text-subtitle2">
              If you're the highest bidder, you have full control of the MKR for one week
            </div>
          </q-card-section>
          <q-separator
            inset
            color="primary"
          />
          <q-card-section>
            <div>
              You have {{ formattedUserWethBalance }} WETH to bid on {{ formattedTotalMkrBalance }} MKR
            </div>
          </q-card-section>
        </q-card>
        <div
          class="hyperlink text-caption need-help q-ml-md"
          @click="showWethDialog=true"
        >
          Need WETH?
        </div>
      </div>
      <!-- VOTING -->
      <div class="col-auto">
        <div
          v-if="currentPhaseNumber > 0"
          class="text-caption live-now q-ml-md "
          @click="showMkrDialog=true"
        >
          Live now for current winner!
        </div>
        <div v-else>
          <!-- Blank line to ensure proper spacing/alignment -->
          <br>
        </div>
        <q-card
          bordered
          class="col-auto card-border q-ma-md"
          style="max-width: 400px"
          @click="navigateToPage('vote')"
        >
          <q-card-section>
            <div class="text-h6">
              Vote with MKR
            </div>
            <div class="text-subtitle2">
              When you're the winning bidder, you can click here to choose a slate to vote on
            </div>
          </q-card-section>
          <q-separator
            inset
            color="primary"
          />
          <q-card-section>
            <div style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
              Current winner: {{ currentWinner }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import { ethers } from 'ethers';
import { date } from 'quasar';

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
      userMkrBalance: (state) => state.auth.data.userMkrBalance,
      userWethBalance: (state) => state.auth.data.userWethBalance,
      isShift: (state) => state.auth.faker.isShift,
      isAuction: (state) => state.auth.faker.isAuction,
      totalMaker: (state) => state.auth.faker.totalMaker,
      currentWinner: (state) => state.auth.faker.currentWinner,
      leadingBidder: (state) => state.auth.faker.leadingBidder,
      currentPhase: (state) => state.auth.faker.currentPhase,
      currentPhaseNumber: (state) => state.auth.faker.currentPhaseNumber,
      currentPeriod: (state) => state.auth.faker.currentPeriod,
      nextPhase: (state) => state.auth.faker.nextPhase,
      leadingBidAmount: (state) => state.auth.faker.leadingBidAmount,
      deploymentTime: (state) => parseFloat(state.auth.faker.deploymentTime.toString()),
      periodLength: (state) => parseFloat(state.auth.faker.periodLength.toString()),
      phaseLength: (state) => parseFloat(state.auth.faker.periodLength.toString()),
    }),

    formattedUserMkrBalance() {
      if (this.userMkrBalance === undefined) return '-';
      return ethers.utils.formatEther(this.userMkrBalance);
    },

    formattedUserWethBalance() {
      if (this.userWethBalance === undefined) return '-';
      return ethers.utils.formatEther(this.userWethBalance);
    },

    formattedTotalMkrBalance() {
      if (this.totalMaker === undefined) return '-';
      return ethers.utils.formatEther(this.totalMaker);
    },

    timeToNextPhase() {
      if (this.isShift) {
        return this.timeToPeriodOffset(1);
      }

      if (this.isAuction) {
        return this.timeToPeriodOffset(1);
      }

      const currentPeriod = parseInt(this.currentPeriod, 10);
      const periodsToNextPhase = this.phaseLength - (currentPeriod % this.phaseLength);

      return this.timeToPeriodOffset(periodsToNextPhase);
    },

    dateNextPhaseStarts() {
      const today = new Date();
      const theDate = date.addToDate(today, { seconds: this.timeToNextPhase });
      return date.formatDate(theDate, 'YYYY-MM-DD HH:mm');
    },

    timeUntilNextPhase() {
      const now = (new Date()).getTime();
      const nextPhase = (date.addToDate(new Date(), { seconds: this.timeToNextPhase })).getTime();
      const secondsRemaining = Math.floor((nextPhase - now) / 1000);

      const hours = Math.floor(secondsRemaining / 3600);
      const secondsLeft = secondsRemaining % 3600;
      const minutes = Math.floor(secondsLeft / 60);
      // const seconds = secondsLeft % 60;
      return `${hours} hours ${minutes} minutes`;
    },
  },

  created() {
    // eslint-disable-next-line
    setInterval(() => this.now = new Date(), 10000);
  },

  methods: {
    navigateToPage(name) {
      this.$router.push({ name });
    },

    timeToPeriodOffset(periodOffset) {
      const periodLength = parseInt(this.periodLength, 10);
      const deploymentTime = parseInt(this.deploymentTime, 10);
      const currentPeriod = parseInt(this.currentPeriod, 10);
      const nextPeriodTime = deploymentTime + (currentPeriod + periodOffset) * periodLength;
      const secondsToNextPeriod = nextPeriodTime - (Date.now() / 1000); // assumes local clock is correct
      return secondsToNextPeriod;
    },
  },
};
</script>

<style lang="stylus" scoped>
.code {
  font-family: monospace;
}

.need-help {
  position: relative;
  top: -10px;
}

.live-now {
  position: relative;
  top: 10px;
}
</style>
