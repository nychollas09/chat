import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import JWTPayload from 'src/shared/domain/model/jwt-payload.model';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { TokenService } from '../token.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private tokenService: TokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.refreshToken,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(request: Request) {
    const refreshToken = request.cookies?.refreshToken;
    return this.tokenService.verifyTokenValid(refreshToken, 'refresh-token');
  }
}
