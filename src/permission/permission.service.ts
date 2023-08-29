import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../common/abstract.service';
import { Permission } from './permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService extends AbstractService<Permission> {
  constructor(@InjectRepository(Permission) repository: Repository<Permission>) {
    super(repository);
  }
}
