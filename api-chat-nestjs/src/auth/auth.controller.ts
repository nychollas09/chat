import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import AccessUser from 'src/shared/domain/interface/access-user.interface';
import JWTResponse from 'src/shared/domain/interface/jwt-response.interface';
import { AuthService } from './auth.service';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('token')
  public login(
    @Res({ passthrough: true }) response: Response,
    @Body() { email }: AccessUser,
  ): Promise<JWTResponse> {
    return this.authService.login(response, { email });
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('token/refresh')
  public getNewAccessToken(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    return this.authService.getNewAccessTokenFromRefreshToken(
      response,
      request.cookies.refreshToken,
    );
  }

  @Delete('token/revoke')
  public revokeToken(@Res({ passthrough: true }) response: Response) {
    this.authService.setRefreshTokenInCookie(response, undefined, undefined);
    response.removeHeader('Authorization');
    response.status(HttpStatus.NO_CONTENT);
  }
}
