import {
  BadRequestException,
  // HttpException,
  // HttpStatus,
  Injectable,
  NotFoundException,
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
        email: ticketData.email,
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

  async update(id: string, updateTicketDto: any): Promise<IResponse<string>> {
    const ticket = await this.ticketModel.findOne({
      _id: id,
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    const updatedTicket = await this.ticketModel.updateOne(
      { _id: id },
      {
        $set: updateTicketDto,
      },
      { upsert: false },
    );

    if (
      updatedTicket.acknowledged == true &&
      updatedTicket.modifiedCount == 0
    ) {
      return sendResponse({
        status: false,
        data: '',
        message: 'Please provide a valid ticket.',
      });
    }

    return sendResponse({
      status: true,
      data: updatedTicket,
      message: 'Ticket Updated Successfully.',
    });
  }

  async removeTicketById(id: string): Promise<IResponse<string>> {
    try {
      const ticket = await this.ticketModel.find({
        _id: id,
      });

      if (!ticket) {
        throw new NotFoundException('Ticket not found');
      }

      const deleteTicket = await this.ticketModel.deleteOne({ _id: id });
      console.log(`Delete ticket response =>`, deleteTicket);
      // Delete ticket response => { acknowledged: true, deletedCount: 1 }
      if (
        deleteTicket.acknowledged === true &&
        deleteTicket.deletedCount === 1
      ) {
        return sendResponse({
          status: true,
          data: '',
          message: 'Ticket removed Successfully.',
        });
      } else {
        return sendResponse({
          status: false,
          data: '',
          message: 'Oops! Something went wrong.',
        });
      }
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }
}
