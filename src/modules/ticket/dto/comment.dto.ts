import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class IndividualCommentDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username: string;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsString()
  @IsOptional()
  id: string;
}

export class AddCommentDto {
  @IsString()
  @IsNotEmpty()
  ticketId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  comment: string;
}

export class AllCommentDto {
  @IsString()
  @IsNotEmpty()
  ticketId: string;
}

export class UpdateCommentDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  comment: string;
}

export class RemoveCommentDto {
  @IsString()
  @IsNotEmpty()
  tid: string;

  @IsString()
  @IsNotEmpty()
  cid: string;
}
