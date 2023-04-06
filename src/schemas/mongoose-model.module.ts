import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketSchema, Ticket_MODEL } from 'src/schemas/ticket';
import { UserSchema, USER_MODEL } from 'src/schemas/user';
import { CommentSchema, COMMENT_MODEL } from './comment';

const MODELS = [
  { name: Ticket_MODEL, schema: TicketSchema },
  { name: USER_MODEL, schema: UserSchema },
  { name: COMMENT_MODEL, schema: CommentSchema },
];

@Global()
@Module({
  imports: [MongooseModule.forFeature(MODELS)],
  exports: [MongooseModule],
})
export class MongooseModelsModule {}
