import { Injectable } from '@nestjs/common';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../common/abstract.service';

@Injectable()
export class RoleService extends AbstractService<Role> {
  public constructor(@InjectRepository(Role) repository: Repository<Role>) {
    super(repository);
  }
}
