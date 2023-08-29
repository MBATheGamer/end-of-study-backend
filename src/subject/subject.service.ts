import { Injectable } from '@nestjs/common';
import { Subject } from './subject.entity';
import { Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubjectService extends AbstractService<Subject> {
  constructor(@InjectRepository(Subject) repository: Repository<Subject>) {
    super(repository);
  }
}
