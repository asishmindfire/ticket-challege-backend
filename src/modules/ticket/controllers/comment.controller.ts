import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IResponse } from '../../shared/interfaces/response.interface';
import {
  AddCommentDto,
  RemoveCommentDto,
  UpdateCommentDto,
} from '../dto/comment.dto';
import { CommentService } from '../services/comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() addCommentDto: AddCommentDto): Promise<IResponse<string>> {
    return this.commentService.create(addCommentDto);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<IResponse<string>> {
    return this.commentService.findCommentById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<IResponse<string>> {
    return this.commentService.update(id, updateCommentDto);
  }

  /**
   * tid -> ticketId
   * cid -> commentId
   */
  @Delete(':tid/:cid')
  remove(@Param() removeCommentDto: RemoveCommentDto) {
    return this.commentService.remove(removeCommentDto);
  }
}
