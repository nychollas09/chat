import { IsEmail, IsNotEmpty } from 'class-validator';
import JWTPayload from '../model/jwt-payload.model';

export default class UserDTO {
  public _id: string;

  @IsEmail(
    {},
    {
      message: 'O e-mail não foi informado ou não segue o padrão de um e-mail',
    },
  )
  public email: string;

  @IsNotEmpty({ message: 'O primeiro nome é obrigatório.' })
  public firstName: string;

  @IsNotEmpty({ message: 'O sobrenome é obrigatório.' })
  public lastName: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  public password: string;

  constructor(init?: Partial<UserDTO>) {
    Object.assign(this, init);
  }

  public toJWTPayload(): JWTPayload {
    return new JWTPayload({ ...this, password: undefined });
  }
}
