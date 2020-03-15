<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  created() {
    // Every few seconds, check APIs for updates
    this.$store.dispatch('main/poll');
    setInterval(() => {
      this.$store.dispatch('main/poll');
    }, 7000);
  },
};
</script>
