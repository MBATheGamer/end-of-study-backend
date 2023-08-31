import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Subject } from './subject.entity';
import { SubjectService } from './subject.service';
import { HasPermission } from 'src/permission/has-permission.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('subjects')
export class SubjectController {
  private readonly service: SubjectService;
s
  public constructor(service: SubjectService) {
    this.service = service;
  }

  @Get()
  @HasPermission("view_classrooms")
  public async getAll(
    @Query("orderBy") orderBy: string,
    @Query("ordering") ordering: "ASC"| "DESC",
    @Query("search") search: string,
    @Query("where") where: string,
    @Query("all") all = false, 
    @Query("page") page = 1,
    @Query("limit") limit = 10
  ): Promise<any> {
    if (all) return await this.service.find(["classroom", "teacher"]);
    if (orderBy && ordering) return await this.service.paginateBySort(orderBy, ordering, page, limit, ["classroom", "teacher"]);
    if (search && where) return await this.service.paginateBySearch(search, where, page, limit, ["classroom", "teacher"]);
    return await this.service.paginate(page, limit, ["classroom", "teacher"]);
  }

  @Post()
  @HasPermission("edit_subjects")
  public async create(@Body() body: any): Promise<Subject> {
    const { classroomId, teacherId, ...data } = body;

    return await this.service.create({
      ...data,
      isOnMeet: false,
      classroom: {
        id: classroomId
      },
      teacher: {
        id: teacherId
      }
    });
  }

  @Get(":id")
  @HasPermission("view_subjects")
  public async get(@Param("id") id: number): Promise<Subject> {
    return await this.service.findOne({
      where: {
        id: id
      }
    }, ["classroom", "teacher"]);
  }

  @Put(":id")
  @HasPermission("edit_subjects")
  public async update(@Param("id") id: number, @Body() body: any): Promise<Subject> {
    const { classroomId, teacherId, ...data } = body;
    const subject = await this.service.findOne({
      where: {
        id: id
      }
    }, ["classroom", "teacher"]);

    const classroom = { id: classroomId ? classroomId : subject.classroom.id };
    const teacher = { id: teacherId ? teacherId : subject.teacher.id };

    await this.service.update(id, {
      ...data,
      classroom,
      teacher
    });
  
    return await this.service.findOne({
      where: {
        id: id
      }
    }, ["classroom", "teacher"]);
  }

  @Delete(":id")
  @HasPermission("edit_subjects")
  public async delete(@Param("id") id: number): Promise<DeleteResult> {
    return await this.service.delete(id);
  }
}
