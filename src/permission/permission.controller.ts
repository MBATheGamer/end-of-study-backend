import { Controller, Get, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('permissions')
export class PermissionController {
  private readonly service: PermissionService;
  
  constructor(service: PermissionService) {
    this.service = service;
  }

  @Get()
  public async getAll() {
    return this.service.find();
  }
}
