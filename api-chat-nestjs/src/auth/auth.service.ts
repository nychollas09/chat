import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import UserDTO from 'src/shared/domain/dto/user.dto';
import AccessUser from 'src/shared/domain/interface/access-user.interface';
import { HttpExceptionResponse } from 'src/shared/domain/interface/http-exception-response.interface';
import JWTResponse from 'src/shared/domain/interface/jwt-response.interface';
import JWTPayload from 'src/shared/domain/model/jwt-payload.model';
import BcryptUtil from 'src/shared/util/bcrypt.util';
import { UserService } from 'src/user/user.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  public async login(
    response: Response,
    { email }: AccessUser,
  ): Promise<JWTResponse> {
    const user = await this.userService.getByEmail(email);
    user.password = undefined;
    const {
      token: accessToken,
      expires_in: expires_in_access_token,
    } = this.tokenService.generateAccessToken(user);
    const {
      token: refresh_token,
      expires_in: expires_in_refresh_token,
    } = this.tokenService.generateRefreshToken(user);

    this.setRefreshTokenInCookie(
      response,
      refresh_token,
      expires_in_refresh_token,
    );

    return {
      accessToken,
      token_type: 'bearer',
      expires_in: expires_in_access_token,
    };
  }

  public getNewAccessTokenFromRefreshToken(
    response: Response,
    refreshToken: string,
  ): Promise<JWTResponse> {
    const { email } = this.tokenService.decodeToken(refreshToken) as JWTPayload;
    return this.login(response, { email });
  }

  public setRefreshTokenInCookie(
    response: Response,
    refreshToken: string,
    expires_in: number,
  ): void {
    response.cookie('refreshToken', refreshToken, {
      maxAge: expires_in || 0,
      expires: expires_in ? new Date(expires_in) : undefined,
      httpOnly: true,
      secure: Boolean(process.env.JWT_REFRESH_TOKEN_HTTPS_SECURE),
      path: '/auth/token',
    });
  }

  public async validateUser(email: string, password: string): Promise<UserDTO> {
    const existingUser = await this.userService.getByEmail(email);
    if (!BcryptUtil.comparePassword(password, existingUser.password)) {
      throw new HttpException(
        {
          message: 'Usuário ou senha inválida!',
          error: 'unauthorized',
        } as HttpExceptionResponse,
        HttpStatus.UNAUTHORIZED,
      );
    }
    delete existingUser.password;
    return new UserDTO(existingUser);
  }
}
