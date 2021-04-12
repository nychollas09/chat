import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAccessTokenGuard } from 'src/auth/guards/jwt-access-token.guard';
import UserDTO from 'src/shared/domain/dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAccessTokenGuard)
  @Get()
  public findAll() {
    return this.userService.findAll();
  }

  @Post()
  public createUser(@Body() user: UserDTO) {
    return this.userService.save(user);
  }
}
