<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + Vite App" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    HelloWorld: () => import('./Welcome.vue'),
  },
};
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
