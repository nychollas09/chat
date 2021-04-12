<template>
  <div id="app">
    <Navbar v-if="logged" />
    <div class="container d-flex mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navbar from './components/Navbar.vue';
import AuthProvider from './shared/util/auth-provider.util';

@Component({
  components: {
    Navbar,
  },
})
export default class App extends Vue {
  public logged = AuthProvider.logged;

  constructor() {
    super();
    this.handleLoggedEvent();
  }

  private handleLoggedEvent(): void {
    AuthProvider.loginEvent.subscribe(({ logged }) => (this.logged = logged));
  }
}
</script>

<style lang="scss"></style>
