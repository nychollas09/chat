import { required, email } from '@rxweb/reactive-forms';

export default class SigupForm {
  @required({ message: 'Nome é obrigatório' })
  public firstName: string;

  @required({ message: 'Sobrenome é obrigatório' })
  public lastName: string;

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
