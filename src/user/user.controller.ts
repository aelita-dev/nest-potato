import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser (
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('dob') dob: Date,
    @Body('password') password: string
  ) {
    return this.usersService.createUser(username, email, dob, password);
  }
}
