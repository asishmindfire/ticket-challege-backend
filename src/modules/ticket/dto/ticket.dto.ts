import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class TicketDto {
  @IsString()
  @IsNotEmpty()
  product: string;

  @IsString()
  @IsNotEmpty()
  ticketname: string;

  @IsString()
  @IsNotEmpty()
  ticketdescription: string;

  @IsString()
  @IsOptional()
  created_by?: string;

  @IsString()
  @IsOptional()
  assign_to?: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  // @IsEmail()
  @IsOptional()
  email?: string;
}
