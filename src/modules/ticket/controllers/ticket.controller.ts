import { Body, Controller, Get, Post } from '@nestjs/common';
import { IResponse } from '../../shared/interfaces/response.interface';
import { TicketDto } from '../dto/ticket.dto';
import { TicketService } from '../services/ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Body() ticketData: TicketDto): Promise<IResponse<string>> {
    return this.ticketService.create(ticketData);
  }

  @Get()
  findAll() {
    return this.ticketService.findAll();
  }
}
