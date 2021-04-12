<template>
  <b-card class="flex-fill ml-auto mr-auto mt-5" style="max-width: 500px;">
    <form @submit.prevent="onSubmit" autocomplete="off">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <b-form-group>
            <b-form-input
              v-model="sigupForm.props.firstName"
              type="text"
              placeholder="Nome"
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-sm-12 col-md-6">
          <b-form-group>
            <b-form-input
              v-model="sigupForm.props.lastName"
              type="text"
              placeholder="Sobrenome"
            ></b-form-input>
          </b-form-group>
        </div>
      </div>

      <b-form-group>
        <b-form-input
          v-model="sigupForm.props.email"
          type="email"
          placeholder="E-mail"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
          v-model="sigupForm.props.password"
          type="password"
          placeholder="Senha"
        ></b-form-input>
      </b-form-group>

      <b-button block variant="primary" type="submit">Cadastrar-se</b-button>
    </form>
  </b-card>
</template>

<script lang="ts">
import { IFormGroup, RxFormBuilder } from '@rxweb/reactive-forms';
import { Component, Vue } from 'vue-property-decorator';
import 'vue-router';
import 'bootstrap-vue';
import User from '../shared/domain/model/user.model';
import SigupForm from '../shared/form/sigup.form';
import Api from '../shared/util/axios-provider.util';

@Component
export default class Sigup extends Vue {
  public sigupForm: IFormGroup<SigupForm>;

  constructor() {
    super();
    this.sigupForm = new RxFormBuilder().formGroup(SigupForm) as IFormGroup<SigupForm>;
  }

  public onSubmit(): void {
    Api.post<User>('/user', new User(this.sigupForm.props))
      .then((response) => response.data)
      .then(() => {
        this.$bvToast.toast('Usuário cadastrado com sucesso', {
          title: 'Sucesso',
          variant: 'success',
          solid: true,
          appendToast: true,
        });
        this.$router.push('/login');
      });
  }
}
</script>

<style lang="scss"></style>
