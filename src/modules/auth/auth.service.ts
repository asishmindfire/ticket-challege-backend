import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, USER_MODEL } from 'src/schemas/user';
import sendResponse from 'src/utils/sendresponse';
import { IResponse } from '../shared/interfaces/response.interface';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { IAuthService } from './interface/auth.service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>,
  ) {}

  async register(registerData: RegisterDto): Promise<IResponse<string>> {
    try {
      const user = await this.userModel.findOne({ email: registerData.email });

      if (user) {
        throw new NotFoundException('User already register');
      }
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(registerData.password, salt);

      const reqBody = {
        user_name: registerData.user_name,
        user_role: registerData.user_role,
        email: registerData.email,
        password: hash,
      };

      const createdUser = await this.userModel.create(reqBody);
      return sendResponse({
        status: true,
        data: createdUser,
        message: 'User registered successfully.',
      });
    } catch (error) {
      console.log(`==>`, error);

      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.errors);
      }

      throw new ServiceUnavailableException();
    }
  }

  async login(payload: LoginDto): Promise<IResponse<string>> {
    try {
      const user = await this.userModel.findOne({ email: payload.email });

      if (!user) {
        throw new NotFoundException('User Not Found!');
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
      console.log(`==>`, error);

      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.errors);
      }

      throw new ServiceUnavailableException();
    }
  }
}
