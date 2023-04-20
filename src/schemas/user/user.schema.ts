import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { USER_ROLE } from 'src/constants';

@Schema({
  timestamps: true,
  collection: 'users',
})
export class User {
  @Prop({ required: true })
  user_name: string;

  @Prop({
    type: String,
    enum: Object.keys(USER_ROLE),
    required: true,
  })
  user_role: USER_ROLE;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export type UserDocument = User & Document;

const schema = SchemaFactory.createForClass(User);

export const USER_MODEL = User.name;

export const UserSchema = schema;
