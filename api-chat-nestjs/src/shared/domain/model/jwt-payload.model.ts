import UserDTO from '../dto/user.dto';

export default class JWTPayload {
  public _id: number;
  public email: string;
  public firstName: string;
  public lastName: string;

  constructor(init?: Partial<JWTPayload>) {
    Object.assign(this, init);
  }

  public toUserDTO(): UserDTO {
    return new UserDTO(this);
  }
}
