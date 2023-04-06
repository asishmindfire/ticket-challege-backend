import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'users',
})
export class User {
  @Prop({ required: true })
  user_name: string;

  @Prop({ required: true })
  user_role: string;

  @Prop({ required: true })
  email: string;

  // @Prop({ required: true, select: false })
  @Prop({ required: true })
  password: string;
}

export type UserDocument = User & Document;

const schema = SchemaFactory.createForClass(User);

export const USER_MODEL = User.name;

export const UserSchema = schema;
