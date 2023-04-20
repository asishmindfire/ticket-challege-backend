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
  RemoveCommentDto,
  UpdateCommentDto,
} from '../dto/comment.dto';
import { CommentDocument, COMMENT_MODEL } from 'src/schemas/comment';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(COMMENT_MODEL)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async create(addCommentDto: AddCommentDto): Promise<IResponse<string>> {
    try {
      const dataToBeInserte = {
        ticketId: addCommentDto.ticketId,
        userId: addCommentDto.userId,
        comment: addCommentDto.comment,
      };

      const insertedComment = await this.commentModel.create(dataToBeInserte);

      return sendResponse({
        status: true,
        data: insertedComment,
        message: 'Comment added successfully.',
      });
    } catch (error) {
      console.log(`error =>`, error);

      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.errors);
      }

      throw new ServiceUnavailableException();
    }
  }

  async findCommentById(id: string): Promise<IResponse<string>> {
    const comments = await this.commentModel.find({ ticketId: id });
    if (!comments) {
      return sendResponse({
        status: true,
        data: '',
        message: 'Records retrieved Successfully.',
      });
    }
    return sendResponse({
      status: true,
      data: comments,
      message: 'Records retrieved Successfully.',
    });
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<IResponse<string>> {
    const comments = await this.commentModel.find({
      ticketId: id,
    });

    if (!comments) {
      throw new NotFoundException('Comment not found');
    }

    const comment = comments.find(
      (item) => item._id.toString() === updateCommentDto.id,
    );
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    delete updateCommentDto.id;

    const commentToBeUpdate = await this.commentModel.updateOne(
      {
        _id: comment._id,
      },
      {
        $set: updateCommentDto,
      },
      { upsert: false },
    );

    if (
      commentToBeUpdate.acknowledged == true &&
      commentToBeUpdate.modifiedCount == 0
    ) {
      return sendResponse({
        status: false,
        data: '',
        message: 'Please provide a valid ticket.',
      });
    }

    return sendResponse({
      status: true,
      data: commentToBeUpdate,
      message: 'Record Updated Successfully.',
    });
  }

  async remove(removeCommentDto: RemoveCommentDto): Promise<IResponse<string>> {
    const comments = await this.commentModel.find({
      ticketId: removeCommentDto.tid,
    });

    if (!comments) {
      throw new NotFoundException('Comment not found');
    }

    const comment = comments.find(
      (item) => item._id.toString() === removeCommentDto.cid,
    );

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const commentToBeDeleted = await this.commentModel.deleteOne({
      _id: comment._id,
    });

    if (
      commentToBeDeleted.acknowledged == true &&
      commentToBeDeleted.deletedCount == 1
    ) {
      return sendResponse({
        status: true,
        data: '',
        message: 'Record deleted successfully.',
      });
    }

    return sendResponse({
      status: false,
      data: '',
      message: 'Please provide a valid ticketId/CommentId.',
    });
  }
}
