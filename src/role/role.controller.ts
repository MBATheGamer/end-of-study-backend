import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { Permission } from '../permission/permission.entity';
import { HasPermission } from '../permission/has-permission.decorator';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('roles')
export class RoleController {
  private readonly service: RoleService;

  public constructor(service: RoleService) {
    this.service = service;
  }

  @Get()
  @HasPermission("view_roles")
  public async getAll(): Promise<any> {
    return await this.service.find();
  }

  @Post()
  @HasPermission("edit_roles")
  public async create(
    @Body("name") name: string,
    @Body("permissions") permissions: number[]
  ): Promise<Role> {
    return this.service.create({
      name: name,
      permissions: permissions.map(id => {
        return { id: id } as Permission;
      })
    });
  }

  @Get(":id")
  @HasPermission("view_roles")
  public async get(@Param("id") id: number): Promise<Role> {
    return await this.service.findOne({
      where: {
        id: id
      }
    }, ["permissions"]);
  }

  @Put(":id")
  public async update(
    @Param("id") id: number,
    @Body("name") name: string,
    @Body("permissions") permissions: number[]
  ): Promise<Role> {
    await this.service.update(id, {
      name: name
    });

    const role = await this.service.findOne({
      where: {
        id: id
      }
    });

    return this.service.create({
      ...role,
      permissions: permissions.map(id => {
        return { id: id } as Permission;
      })
    });
  }

  @Delete(":id")
  @HasPermission("edit_roles")
  public async delete(@Param("id") id: number): Promise<DeleteResult> {
    return await this.service.delete(id);
  }
}
