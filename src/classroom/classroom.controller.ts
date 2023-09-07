import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { Classroom } from './classroom.entity';
import { DeleteResult } from 'typeorm';
import { HasPermission } from 'src/permission/has-permission.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('classrooms')
export class ClassroomController {
  private readonly service: ClassroomService;

  public constructor(service: ClassroomService) {
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
    if (all) return await this.service.find(["department"]);
    return await this.service.paginate(ordering, orderBy, where, search, page, limit, ["department"]);
  }

  @Post()
  @HasPermission("edit_classrooms")
  public async create(@Body() body: any): Promise<Classroom> {
    const { departmentId, ...data } = body;
    
    return await this.service.create({
      ...data,
      department: {
        id: departmentId
      }
    });
  }

  @Get(":id")
  @HasPermission("view_classrooms")
  public async get(@Param("id") id: number): Promise<Classroom> {
    return await this.service.findOne({
      where: {
        id: id
      }
    }, ["department"]);
  }

  @Put(":id")
  @HasPermission("edit_classrooms")
  public async update(@Param("id") id: number, @Body() body: any): Promise<Classroom> {
    const { departmentId, ...data } = body;
    
    await this.service.update(id, {
      ...data,
      department: {
        id: departmentId
      }
    });
  
    return await this.service.findOne({
      where: {
        id: id
      }
    }, ["department"]);
  }

  @Delete(":id")
  @HasPermission("edit_classrooms")
  public async delete(@Param("id") id: number): Promise<DeleteResult> {
    return await this.service.delete(id);
  }
}
