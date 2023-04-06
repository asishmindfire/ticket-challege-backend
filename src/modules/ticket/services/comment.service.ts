import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import sendResponse from 'src/utils/sendresponse';
import { IResponse } from '../../shared/interfaces/response.interface';
import {
  AddCommentDto,
  IndividualCommentDto,
  RemoveCommentDto,
  UpdateCommentDto,
} from '../dto/comment.dto';
import * as moment from 'moment-timezone';
import { CommentDocument, COMMENT_MODEL } from 'src/schemas/comment';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(COMMENT_MODEL)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async create(addCommentDto: AddCommentDto): Promise<IResponse<string>> {
    try {
      const minm = 100000;
      const maxm = 999999;
      const commetsList = addCommentDto.comments.map(
        (item: IndividualCommentDto) => {
          return {
            id: Math.floor(Math.random() * (maxm - minm + 1)) + minm,
            username: item.username,
            comment: item.comment,
            date: moment().tz('Asia/Kolkata').format(),
          };
        },
      );

      console.log(`===>`, commetsList);

      const comment = await this.commentModel.findOne({
        ticketId: addCommentDto.ticketId,
      });

      if (!comment) {
        const commentToBeInserted = {
          ticketId: addCommentDto.ticketId,
          comments: commetsList,
        };

        const insertedComment = await this.commentModel.create(
          commentToBeInserted,
        );
        return sendResponse({
          status: true,
          data: insertedComment,
          message: 'Comment added successfully.',
        });
      } else {
        const commentToBeUpdated = await this.commentModel.updateOne(
          { ticketId: addCommentDto.ticketId },
          {
            $push: {
              comments: { $each: commetsList },
            },
          },
          { upsert: false },
        );
        if (
          commentToBeUpdated.acknowledged == true &&
          commentToBeUpdated.modifiedCount == 0
        ) {
          return sendResponse({
            status: false,
            data: '',
            message: 'Please provide a valid ticket.',
          });
        }

        return sendResponse({
          status: true,
          data: commentToBeUpdated,
          message: 'Record Updated Successfully.',
        });
      }
    } catch (error) {
      console.log(`error =>`, error);

      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.errors);
      }

      throw new ServiceUnavailableException();
    }
  }

  async findCommentById(id: string): Promise<IResponse<string>> {
    const comments = await this.commentModel.findOne({ ticketId: id });
    // const comments = await this.commentModel.find();
    console.log(comments);
    if (!comments) {
      return sendResponse({
        status: true,
        data: '',
        message: 'Records retrieved Successfully.',
      });
    }
    return sendResponse({
      status: true,
      data: [comments],
      message: 'Records retrieved Successfully.',
    });
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<IResponse<string>> {
    const comment = await this.commentModel.find({
      ticketId: id,
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const commentToBeUpdated = await this.commentModel.updateOne(
      {
        'comments.id': updateCommentDto.update_data.id,
      },
      {
        $set: {
          'comments.$.comment': updateCommentDto.update_data.comment,
          'comments.$.date': moment().tz('Asia/Kolkata').format(),
        },
      },
      { upsert: false, strict: false },
    );

    if (
      commentToBeUpdated.acknowledged == true &&
      commentToBeUpdated.modifiedCount == 0
    ) {
      return sendResponse({
        status: false,
        data: '',
        message: 'Please provide a valid ticket.',
      });
    }

    return sendResponse({
      status: true,
      data: commentToBeUpdated,
      message: 'Record Updated Successfully.',
    });
  }

  async remove(removeCommentDto: RemoveCommentDto): Promise<IResponse<string>> {
    const comment = await this.commentModel.find({
      ticketId: removeCommentDto.tid,
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const filteredComment = comment[0].comments.filter(
      (item) => item.id !== removeCommentDto.cid.toString(),
    );

    const commentToBeUpdated = await this.commentModel.updateOne(
      { ticketId: removeCommentDto.tid },
      {
        $set: {
          comments: filteredComment,
        },
      },
      { upsert: false },
    );

    if (
      commentToBeUpdated.acknowledged == true &&
      commentToBeUpdated.modifiedCount == 0
    ) {
      return sendResponse({
        status: false,
        data: '',
        message: 'Please provide a valid ticket.',
      });
    }

    return sendResponse({
      status: true,
      data: commentToBeUpdated,
      message: 'Record Updated Successfully.',
    });
  }
}
