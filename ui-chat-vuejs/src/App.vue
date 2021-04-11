<template>
  <div id="app">
    <Navbar v-if="isAuthenticated" />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navbar from './components/Navbar.vue';

@Component({
  components: {
    Navbar,
  },
  data() {
    return {
      isAuthenticated: true,
    };
  },
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
