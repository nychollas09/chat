import jwtDecode from 'jwt-decode';
import { Subject } from 'rxjs';
import JWTPayload from '../domain/interface/jwt-payload.interface';
import User from '../domain/model/user.model';

export default class AuthProvider {
  public static loginEvent = new Subject<{ logged: boolean; user: User | undefined }>();

  public static get logged(): boolean {
    return AuthProvider.validationToken(localStorage.getItem('token'));
  }

  public static get user(): User {
    return new User(
      AuthProvider.logged ? { ...jwtDecode(localStorage.getItem('token') as string) } : undefined,
    );
  }

  public static defineToken(token: string): void {
    localStorage.setItem('token', token);
    AuthProvider.loginEvent.next({ logged: true, user: AuthProvider.user });
  }

  public static validationToken(token: string | null): boolean {
    if (!token) {
      return false;
    }
    const { exp }: JWTPayload = jwtDecode(token);
    return !!exp && new Date() < new Date(exp * 1000);
  }
}
