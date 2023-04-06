import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User, USER_MODEL } from '../user/user.schema';
import { Document } from 'mongoose';
import { STATUS } from 'src/constants';

@Schema({
  timestamps: true,
})
export class Ticket {
  @Prop({ required: true })
  product: string;

  @Prop({ required: true })
  ticket_name: string;

  @Prop({ required: true })
  ticket_desc?: string;

  @Prop({ type: Types.ObjectId, ref: USER_MODEL, required: true })
  created_by: Types.ObjectId | User;

  @Prop({ type: Types.ObjectId, ref: USER_MODEL, required: true })
  assign_to?: Types.ObjectId | User;

  @Prop({
    type: String,
    enum: Object.keys(STATUS),
    required: true,
  })
  status?: STATUS;
}

export type TicketDocument = Ticket & Document;

export const TicketSchema = SchemaFactory.createForClass(Ticket);

export const Ticket_MODEL = Ticket.name;
