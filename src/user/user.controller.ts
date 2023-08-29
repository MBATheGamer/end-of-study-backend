import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDto } from './models/user-update.dto';
import { UserCreateDto } from './models/user-create.dto';
import { AuthGuard } from '../auth/auth.guard';
import * as bcrypt from "bcryptjs";
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { HasPermission } from 'src/permission/has-permission.decorator';
import { User } from './models/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  private readonly authService: AuthService;
  private readonly userService: UserService;

  public constructor(authService: AuthService, userService: UserService) {
    this.authService = authService;
    this.userService = userService;
  }

  @Get()
  @HasPermission("view_users")
  public async getAll(@Query("role") role: string, @Query("page") page = 1): Promise<any> {
    if (role === "teacher") return await this.userService.findByRole(2, ["role"]);
    return await this.userService.paginate(page, 30, ["role", "classroom"]);
  }

  @Post()
  @HasPermission("edit_users")
  public async create(@Body() body: UserCreateDto) {
    const password = await bcrypt.hash(body["cin"], 12);

    const { roleId, classroomId, ...data } = body;

    let classroom = null;

    if (classroomId) {
      classroom = {
        id: classroomId
      };
    }

    return this.userService.create({
      ...data,
      password,
      role: {
        id: roleId
      },
      classroom
    });
  }

  @Get(":id")
  @HasPermission("view_users")
  public async get(@Param("id") id: number): Promise<User> {
    return await this.userService.findOne({
      where: {
        id: id
      }
    }, ["role", "classroom"]);
  }

  @Put("info")
  public async updateInfo(
    @Req() request: Request,
    @Body() body: UserUpdateDto
  ) {
    const id = await this.authService.userId(request);

    await this.userService.update(id, body);

    return this.userService.findOne({
      where: {
        id: id
      }
    }, ["role"]);
  }

  @Put("password")
  public async updatePassword(
    @Req() request: Request,
    @Body("password") password: string,
    @Body("passwordConfirm") passwordConfirm: string,
  ) {
    if (password !== passwordConfirm) {
      throw new BadRequestException("Passwords do not matches!");
    }

    const id = await this.authService.userId(request);

    await this.userService.update(id, {
      password: await bcrypt.hash(password, 12)
    });

    return this.userService.findOne({
      where: {
        id: id
      },
    }, ["role"]);
  }

  @Put(":id")
  @HasPermission("edit_users")
  public async update(
    @Param("id") id: number,
    @Body() body: UserUpdateDto
  ) {
    const { roleId, classroomId, ...data } = body;

    let classroom = null;

    if (classroomId) {
      classroom = {
        id: classroomId
      };
    }

    await this.userService.update(id, {
      ...data,
      role: {
        id: roleId
      },
      classroom
    });

    return await this.userService.findOne({
      where: {
        id: id
      }
    }, ["role", "classroom"]);
  }

  @Delete(":id")
  @HasPermission("edit_users")
  public async delete(@Param("id") id: number) {
    return await this.userService.delete(id);
  }
}
