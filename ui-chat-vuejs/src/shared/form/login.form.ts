import { required, email } from '@rxweb/reactive-forms';

export default class LoginForm {
  @email({
    message: 'E-mail inválido',
  })
  @required({
    message: 'E-mail é obrigatório',
  })
  public email: string;

  @required({ message: 'Senha é obrigatória' })
  public password: string;
}
