<template>
  <b-card class="flex-fill ml-auto mr-auto mt-5" style="max-width: 500px;">
    <form @submit.prevent="onSubmit" autocomplete="off">
      <b-form-group>
        <b-form-input
          v-model="loginForm.props.email"
          type="email"
          placeholder="E-mail"
        ></b-form-input>
        <b-form-text>
          Credencial de teste: teste@teste.com
        </b-form-text>
      </b-form-group>

      <b-form-group>
        <b-form-input
          v-model="loginForm.props.password"
          type="password"
          placeholder="Senha"
        ></b-form-input>
        <b-form-text>
          Credencial de teste: 123
        </b-form-text>
      </b-form-group>

      <b-button block variant="primary" type="submit">Login</b-button>
      <hr />
      <b-button block variant="danger" @click="navigationSigup">Cadastrar-se</b-button>
    </form>
  </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RxFormBuilder, IFormGroup } from '@rxweb/reactive-forms';
import LoginForm from '../shared/form/login.form';
import 'vue-router';
import 'bootstrap-vue';
import Api from '../shared/util/axios-provider.util';
import User from '../shared/domain/model/user.model';
import JWTResponse from '../shared/domain/interface/jwt-response.interface';
import AuthProvider from '../shared/util/auth-provider.util';
import ApiError from '../shared/domain/interface/api-error.interface';

@Component
export default class Login extends Vue {
  public loginForm: IFormGroup<LoginForm>;

  constructor() {
    super();
    this.loginForm = new RxFormBuilder().formGroup(LoginForm) as IFormGroup<LoginForm>;
  }

  public onSubmit(): void {
    Api.post<JWTResponse>('/auth/token', {
      ...new User(this.loginForm.props),
      grant_type: 'password',
    })
      .then((response) => response.data)
      .then(({ accessToken }) => {
        AuthProvider.defineToken(accessToken);
        this.$router.push('/chat');
      })
      .catch((error: { response: { data: ApiError } }) => {
        const { message, error: responseError } = error.response.data;
        this.$bvToast.toast(message || responseError, {
          title: 'Erro',
          variant: 'danger',
          solid: true,
          appendToast: true,
        });
      });
  }

  public navigationSigup(): void {
    this.$router.push('/sigup');
  }
}
</script>

<style lang="scss"></style>
