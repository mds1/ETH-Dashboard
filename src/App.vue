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
    this.$store.dispatch('auth/poll');
    setInterval(() => {
      this.$store.dispatch('auth/poll');
    }, 7000);
  },
};
</script>
