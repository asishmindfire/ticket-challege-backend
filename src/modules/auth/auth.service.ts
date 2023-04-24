import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as mongoose from 'mongoose';
import sendResponse from 'src/utils/sendresponse';
import { IResponse } from '../shared/interfaces/response.interface';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { IAuthService } from './interface/auth.service.interface';
import * as bcrypt from 'bcrypt';
import UsersRepository from './user.repository';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UsersRepository,
  ) {}

  async register(registerData: RegisterDto): Promise<IResponse<string>> {
    try {
      const user = await this.userRepository.findOne(registerData.email);

      if (user) {
        throw new HttpException('User already registered', HttpStatus.CONFLICT);
      }
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(registerData.password, salt);

      const reqBody = {
        user_name: registerData.user_name,
        user_role: registerData.user_role,
        email: registerData.email,
        password: hash,
      };

      const createdUser = await this.userRepository.create(reqBody);
      return sendResponse({
        status: true,
        data: createdUser,
        message: 'User registered successfully.',
      });
    } catch (error) {
      console.error(`Error in register: ${error}`);
      if (error instanceof mongoose.Error.ValidationError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Something went wrong while registering user',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async login(payload: LoginDto): Promise<IResponse<string>> {
    try {
      const user = await this.userRepository.findOne(payload.email);

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const token = this.jwtService.sign(
        { user },
        {
          secret: process.env.SECRETKEY,
        },
      );

      return sendResponse({
        status: true,
        data: token,
        message: 'Token generated successfully.',
      });
    } catch (error) {
      console.error(`Error in login: ${error}`);
      if (error instanceof mongoose.Error.ValidationError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Something went wrong while login',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
