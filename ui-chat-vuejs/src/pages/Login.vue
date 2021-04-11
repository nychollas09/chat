<template>
  <b-form @submit="onSubmit">
    <b-form-input v-model="loginForm.props.email" type="email" placeholder="E-mail"></b-form-input>
    <!--<b-form-invalid-feedback v-if="loginForm.controls.email.errors">
      {{ loginForm.controls.email.errors.email.message }}
      {{ loginForm.controls.email.errors.required.message }}
    </b-form-invalid-feedback>-->

    <b-form-input
      class="mt-3"
      v-model="loginForm.props.password"
      type="password"
      placeholder="Senha"
    ></b-form-input>
    <!--<b-form-invalid-feedback v-if="loginForm.controls.password.errors">
      {{ loginForm.controls.password.errors.required.message }}
    </b-form-invalid-feedback>-->

    <b-button type="submit" variant="primary" class="mt-3">Login</b-button>
  </b-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RxFormBuilder, IFormGroup } from '@rxweb/reactive-forms';
import LoginForm from '../shared/form/login.form';
import 'vue-router';
/* import { AuthApi } from '../shared/util/axios-provider.util'; */
// import User from '../shared/domain/model/user.model';

@Component
export default class Login extends Vue {
  public loginForm: IFormGroup<LoginForm>;

  constructor() {
    super();
    this.loginForm = new RxFormBuilder().formGroup(LoginForm) as IFormGroup<LoginForm>;
  }

  public onSubmit(event: Event): void {
    event.preventDefault();
    // AuthApi.post('', new User(this.loginForm.props)).then(response => response.data).then();
    debugger;
    this.$router.push('home');
  }
}
</script>

<style lang="scss"></style>
