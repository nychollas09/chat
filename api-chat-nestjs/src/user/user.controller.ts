import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAccessTokenGuard } from 'src/auth/guards/jwt-access-token.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAccessTokenGuard)
  @Get()
  public findAll() {
    return this.userService.findAll();
  }
}
