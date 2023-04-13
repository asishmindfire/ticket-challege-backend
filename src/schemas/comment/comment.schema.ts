import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Document } from 'mongoose';
import { Ticket, Ticket_MODEL } from '../ticket';
// import { CommentList, CommentListSchema } from './commentList.schema';
// import { IsNumber } from 'class-validator';
import { User, USER_MODEL } from '../user/user.schema';

@Schema({
  timestamps: true,
})
export class Comment {
  @Prop({ type: Types.ObjectId, ref: Ticket_MODEL, required: true })
  ticketId: Types.ObjectId | Ticket;

  // @Prop([{ type: CommentListSchema }])
  // comments?: CommentList[];

  @Prop({ type: Types.ObjectId, ref: USER_MODEL, required: true })
  username: string | User;

  @Prop({ required: true })
  comment: string;

  // @Prop({ required: true })
  // date: Date;

  // @Prop()
  // @IsNumber()
  // id: string;
}

export type CommentDocument = Comment & Document;

export const CommentSchema = SchemaFactory.createForClass(Comment);

export const COMMENT_MODEL = Comment.name;
