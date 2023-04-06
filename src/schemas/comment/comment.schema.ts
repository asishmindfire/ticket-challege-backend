import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Document } from 'mongoose';
import { Ticket, Ticket_MODEL } from '../ticket';
import { CommentList, CommentListSchema } from './commentList.schema';

@Schema({
  timestamps: true,
})
export class Comment {
  @Prop({ type: Types.ObjectId, ref: Ticket_MODEL, required: true })
  ticketId: Types.ObjectId | Ticket;

  @Prop([{ type: CommentListSchema }])
  comments?: CommentList[];
}

export type CommentDocument = Comment & Document;

export const CommentSchema = SchemaFactory.createForClass(Comment);

export const COMMENT_MODEL = Comment.name;
