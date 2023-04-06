import {
  BadRequestException,
  // HttpException,
  // HttpStatus,
  Injectable,
  ServiceUnavailableException,
  // NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TicketDocument, Ticket_MODEL } from 'src/schemas/ticket';
import sendResponse from 'src/utils/sendresponse';
import { IResponse } from '../../shared/interfaces/response.interface';
import { TicketDto } from '../dto/ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket_MODEL)
    private readonly ticketModel: Model<TicketDocument>,
  ) {}

  async create(ticketData: TicketDto): Promise<IResponse<string>> {
    try {
      const dataToBeInserted = {
        product: ticketData.product,
        ticket_name: ticketData.ticketname,
        ticket_desc: ticketData.ticketdescription,
        created_by: ticketData.created_by,
        assign_to: ticketData.assign_to,
        status: ticketData.status,
      };
      const user = await this.ticketModel.create(dataToBeInserted);
      return sendResponse({
        status: true,
        data: user,
        message: 'Ticket created successfully.',
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.errors);
      }

      throw new ServiceUnavailableException();
    }
  }

  async findAll(): Promise<IResponse<string>> {
    try {
      const tickets = await this.ticketModel.find();
      return sendResponse({
        status: true,
        data: tickets,
        message: 'Tickets retrieved successfully.',
      });
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }
}
