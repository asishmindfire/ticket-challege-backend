import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IResponse } from '../shared/interfaces/response.interface';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() registerData: RegisterDto): Promise<IResponse<string>> {
    return this.authService.register(registerData);
  }

  /**
   *
   * @url /auth/login
   * @auth false
   * @desc Login route
   * @returns token
   *
   */
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Body() loginData: LoginDto): Promise<IResponse<string>> {
    return this.authService.login(loginData);
  }
}
