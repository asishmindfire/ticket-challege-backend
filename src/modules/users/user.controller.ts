import { Controller, Get } from '@nestjs/common';
import { IResponse } from '../shared/interfaces/response.interface';
import { UserService } from './user.service';

@Controller('user')
export class TicketController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<IResponse<string>> {
    console.log(`Reached`);
    return this.userService.findAll();
  }
}
