import { Controller, Delete, Param, Get, Post, Put, Body, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { DeleteResult } from 'typeorm';
import { Post as PostEntity } from './post.entity';
import { File } from './file.entity';
import { SubjectService } from '../subject/subject.service';

@Controller('posts')
export class PostController {
  private readonly postService: PostService;
  private readonly subjectService: SubjectService;

  public constructor(service: PostService, subjectService: SubjectService) {
    this.postService = service;
    this.subjectService = subjectService;
  }

  @Get()
  public async getAll(@Query("subjectId") subjectId: number): Promise<any> {
    return await this.postService.findBySubjectId(subjectId, ["files"]);
  }

  @Post()
  public async create(
    @Body("title") title: string,
    @Body("subjectId") subjectId: number,
    @Body("content") content: string,
    @Body("files") files: string[]
  ): Promise<PostEntity> {
    const subject = await this.subjectService.findOne({
      where: {
        id: subjectId
      }
    });
    return this.postService.create({
      title: title,
      content: content,
      subject: subject,
      createdAt: new Date(),
      updatedAt: new Date(),
      files: files?.map(path => {
        return { path } as File;
      })
    });
  }

  @Get(":id")
  public async get(@Param("id") id: number): Promise<PostEntity> {
    return await this.postService.findOne({
      where: {
        id: id
      }
    }, ["files"]);
  }

  @Put(":id")
  public async update(
    @Param("id") id: number,
    @Body("title") title: string,
    @Body("content") content: string,
    @Body("files") files: string[]
  ): Promise<PostEntity> {
    await this.postService.update(id, {
      title: title,
      content: content,
      updatedAt: new Date()
    });

    const role = await this.postService.findOne({
      where: {
        id: id
      }
    });

    return this.postService.create({
      ...role,
      files: files?.map(path => {
        return { path } as File;
      })
    });
  }

  @Delete(":id")
  public async delete(@Param("id") id: number): Promise<DeleteResult> {
    return await this.postService.delete(id);
  }
}
