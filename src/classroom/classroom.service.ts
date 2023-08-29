import { Injectable } from '@nestjs/common';
import { Classroom } from './classroom.entity';
import { Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClassroomService extends AbstractService<Classroom> {
  constructor(@InjectRepository(Classroom) repository: Repository<Classroom>) {
    super(repository);
  }
}
