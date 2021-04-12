<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <div class="container">
      <b-navbar-brand href="#">Chat</b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-nav-text class="text-white"> Olá {{ userFullName }} </b-nav-text>
        <b-button size="sm" class="ml-3" @click="logout">
          <b-icon icon="power" aria-hidden="true"></b-icon> Logout
        </b-button>
      </b-navbar-nav>
    </div>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import User from '../shared/domain/model/user.model';
import 'vue-router';
import AuthProvider from '../shared/util/auth-provider.util';
import { AuthApi } from '../shared/util/axios-provider.util';

@Component({
  components: {},
})
export default class Navbar extends Vue {
  public user: User = AuthProvider.user;

  constructor() {
    super();
    this.handleLoginEvent();
  }

  private handleLoginEvent(): void {
    AuthProvider.loginEvent.subscribe(({ user }) => (this.user = user as User));
  }

  public get userFullName(): string {
    return `${this.user?.firstName} ${this.user?.lastName}`;
  }

  public logout(): void {
    AuthApi.delete('/revoke').then(() => {
      this.$router.push('/login');
      AuthProvider.loginEvent.next({ logged: false, user: undefined });
    });
  }
}
</script>

<style lang="scss"></style>
