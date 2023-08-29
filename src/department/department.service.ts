import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../common/abstract.service';
import { Department } from './department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService extends AbstractService<Department> {
  constructor(@InjectRepository(Department) repository: Repository<Department>) {
    super(repository);
  }
}
