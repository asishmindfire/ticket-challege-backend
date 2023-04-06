import { Module } from '@nestjs/common';
import { CommentController } from './controllers/comment.controller';
import { TicketController } from './controllers/ticket.controller';
import { CommentService } from './services/comment.service';
import { TicketService } from './services/ticket.service';

@Module({
  imports: [],
  controllers: [TicketController, CommentController],
  providers: [TicketService, CommentService],
  exports: [],
})
export class TicketModule {}
