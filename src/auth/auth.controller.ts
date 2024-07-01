import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/';
import { AuthGuard } from '@nestjs/passport';
import { GetUser, GetRawHeaders, RoleProtected, Auth } from './decorators';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-token')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser(['email']) userEmail: string,
    @GetRawHeaders() rawHeaders: string,
  ) {
    return {
      ok: true,
      message: 'epa',
      user,
      userEmail,
      rawHeaders,
    };
  }

  @Get('private2')
  // @SetMetadata('roles', ['admin', 'superuser'])
  @RoleProtected(ValidRoles.superUser, ValidRoles.user)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      message: 'epa - 2',
      user,
    };
  }

  @Get('private3')
  @Auth(ValidRoles.user)
  testingPrivateRoute3(@GetUser() user: User) {
    return {
      ok: true,
      message: 'epa - 2',
      user,
    };
  }
}
