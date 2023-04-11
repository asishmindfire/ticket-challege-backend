import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber } from 'class-validator';

@Schema()
export class CommentList {
  @Prop({ required: true })
  username: string;
  // Reference to user collection

  @Prop({ required: true })
  comment: string;

  @Prop({ required: true })
  date: Date;

  @Prop()
  @IsNumber()
  id: string;
}

const schema = SchemaFactory.createForClass(CommentList);

export const CommentListSchema = schema;
