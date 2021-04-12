import { Action, Module, VuexModule } from 'vuex-module-decorators';
import User from '../shared/domain/model/user.model';

@Module({ name: 'AuthStore' })
export default class AuthStore extends VuexModule {
  private islogged = !!localStorage.getItem('token');

  public get logged(): boolean {
    return this.islogged;
  }

  @Action
  public login({ dispatch, commit }: any, { email, password }: User): void {
    dispatch;
    commit;
    email;
    password;
  }

  @Action
  public logout({ commit }: any): void {
    commit('logout');
  }
}
