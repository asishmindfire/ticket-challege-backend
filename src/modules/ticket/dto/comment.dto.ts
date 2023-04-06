import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsArray,
  IsObject,
  IsOptional,
} from 'class-validator';

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

  @IsArray()
  @Type(() => IndividualCommentDto)
  @ValidateNested({ each: true })
  comments?: IndividualCommentDto[];
}

export class AllCommentDto {
  @IsString()
  @IsNotEmpty()
  ticketId: string;
}

export class UpdateCommentDto {
  @IsObject()
  @Type(() => IndividualCommentDto)
  @ValidateNested()
  update_data: IndividualCommentDto;
}

export class RemoveCommentDto {
  @IsString()
  @IsNotEmpty()
  tid: string;

  @IsString()
  @IsNotEmpty()
  cid: number;
}
