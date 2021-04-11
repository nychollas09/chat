import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserDTO from 'src/shared/domain/dto/user.dto';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  public verifyTokenValid(
    token: string,
    tokenType: 'access-token' | 'refresh-token',
  ): boolean {
    const res = this.jwtService.verify(token, {
      secret:
        tokenType === 'access-token'
          ? process.env.JWT_ACCESS_TOKEN_SECRET
          : process.env.JWT_REFRESH_TOKEN_SECRET,
    });
    return res === undefined;
  }

  public decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

  public generateAccessToken(user: UserDTO) {
    return {
      token: this.jwtService.sign(
        { ...user.toJWTPayload() },
        {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          expiresIn: '60s',
        },
      ),
      expires_in: 60,
    };
  }

  public generateRefreshToken(user: UserDTO) {
    const expirationTime = 3600 * 24;
    return {
      token: this.jwtService.sign(
        { ...user.toJWTPayload() },
        {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: `${expirationTime}s`,
        },
      ),
      expires_in: expirationTime,
    };
  }
}
