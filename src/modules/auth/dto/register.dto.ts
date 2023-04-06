import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  readonly user_name: string;

  @IsString()
  @IsNotEmpty()
  readonly user_role: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
