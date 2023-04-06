import { Module } from '@nestjs/common';
import { TicketController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [TicketController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
