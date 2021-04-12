export default class User {
  public _id: string;

  public email: string;

  public firstName: string;

  public lastName: string;

  public password: string;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
