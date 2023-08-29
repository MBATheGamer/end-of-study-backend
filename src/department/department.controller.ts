import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Department } from './department.entity';
import { DeleteResult } from 'typeorm';
import { HasPermission } from 'src/permission/has-permission.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('departments')
export class DepartmentController {
  private readonly service: DepartmentService;
s
  public constructor(service: DepartmentService) {
    this.service = service;
  }

  @Get()
  @HasPermission("departments")
  public async getAll(@Query("all") all = false, @Query("page") page = 1): Promise<any> {
    if (all) return await this.service.find();
    return await this.service.paginate(page, 30);
  }

  @Post()
  @HasPermission("edit_departments")
  public async create(@Body() body: any): Promise<Department> {
    return this.service.create(body);
  }

  @Get(":id")
  @HasPermission("view_departments")
  public async get(@Param("id") id: number): Promise<Department> {
    return await this.service.findOne({
      where: {
        id: id
      }
    });
  }

  @Put(":id")
  @HasPermission("edit_departments")
  public async update(@Param("id") id: number, @Body() body: any): Promise<Department> {
    await this.service.update(id, body);

    return await this.service.findOne({
      where: {
        id: id
      }
    });
  }

  @Delete(":id")
  @HasPermission("edit_departments")
  public async delete(@Param("id") id: number): Promise<DeleteResult> {
    return await this.service.delete(id);
  }
}
