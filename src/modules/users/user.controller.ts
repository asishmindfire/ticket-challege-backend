import { Controller, Get, Param } from '@nestjs/common';
import { IResponse } from '../shared/interfaces/response.interface';
import { UserService } from './user.service';

@Controller('user')
export class TicketController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<IResponse<string>> {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<IResponse<string>> {
    return this.userService.find(id);
  }
}
