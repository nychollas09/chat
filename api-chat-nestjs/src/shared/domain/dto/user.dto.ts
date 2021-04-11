import JWTPayload from '../model/jwt-payload.model';

export default class UserDTO {
  public _id: number;
  public email: string;
  public firstName: string;
  public lastName: string;
  public password: string;

  constructor(init?: Partial<UserDTO>) {
    Object.assign(this, init);
  }

  public toJWTPayload(): JWTPayload {
    return new JWTPayload({ ...this, password: undefined });
  }
}
