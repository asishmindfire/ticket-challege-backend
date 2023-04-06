import { IsString, IsNotEmpty } from 'class-validator';

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
  @IsNotEmpty()
  created_by: string;

  @IsString()
  @IsNotEmpty()
  assign_to: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
