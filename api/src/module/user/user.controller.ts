import {
  Controller,
  Get,
  Post,
  UsePipes,
  Body,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('api/users')
  showAllUsers(@Query('page') page: number) {
    return this.userService.showAll(page);
  }

  @Get('api/users/:username')
  showOneUser(@Param('username') username: string) {
    return this.userService.read(username);
  }

  // @Get('auth/whoami')
  // // @UseGuards(new AuthGuard())
  // showMe(@User('username') username: string) {
  //   return this.userService.read(username);
  // }

}
