import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/role/role.entity';
import { RoleService } from 'src/role/role.service';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  private readonly reflector: Reflector;
  private readonly authService: AuthService;
  private readonly userService: UserService;
  private readonly roleService: RoleService

  constructor(
    reflector: Reflector,
    authService: AuthService,
    userService: UserService,
    roleService: RoleService
  ) {
    this.reflector = reflector;
    this.authService = authService;
    this.userService = userService;
    this.roleService = roleService;
  }

  public async canActivate(context: ExecutionContext) {
    const access = this.reflector.get<string>("access", context.getHandler());

    if (!access) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();

    const id = await this.authService.userId(request);

    const user: User = await this.userService.findOne({
      where: {
        id: id
      }
    }, ["role"]);

    const role: Role = await this.roleService.findOne({
      where: {
        id: user.role.id
      }
    }, ["permissions"]);

    return role.permissions.some(permission => permission.name === access);
  }
}
