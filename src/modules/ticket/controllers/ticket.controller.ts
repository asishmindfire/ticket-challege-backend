import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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

  @Post('/search')
  filter(@Body() searchData: string) {
    return this.ticketService.filterticket(searchData);
  }

  @Get()
  findTickets(@Query() queryData: any) {
    return this.ticketService.findPaginatedTickets(queryData);
  }

  // @Get()
  // findAll() {
  //   return this.ticketService.findAll();
  // }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketDto: any,
  ): Promise<IResponse<string>> {
    return this.ticketService.update(id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.removeTicketById(id);
  }
}
