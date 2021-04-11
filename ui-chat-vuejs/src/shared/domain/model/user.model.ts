export default class User {
  public email: string;

  public password: string;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
