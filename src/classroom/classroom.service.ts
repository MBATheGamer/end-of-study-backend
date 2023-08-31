import { Injectable } from '@nestjs/common';
import { Classroom } from './classroom.entity';
import { Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateResult } from 'src/common/paginate-result.interface';

@Injectable()
export class ClassroomService extends AbstractService<Classroom> {
  constructor(@InjectRepository(Classroom) repository: Repository<Classroom>) {
    super(repository);
  }
  
  public async paginateBySort(field: string, order: "ASC" | "DESC", page = 1, take = 15, relations = []) {
    const {data, meta} = await super.paginateBySort(field, order, page, take, relations);

    const classrooms = [];

    for (let user of data) {
      classrooms.push(await this.findOne({
          where: {
            id: user.id
          },
        }, relations)
      );
    }

    return {
      data: classrooms.map((user) => {
        const {password, ...data} = user;
        return data;
      }),
      meta: meta
    }
  }

  public async paginateBySearch(keyword: string, field: string, page = 1, take = 15, relations = []): Promise<PaginateResult<Classroom>>  {
    const {data, meta} = await super.paginateBySearch(keyword, field, page, take);

    const classrooms: Classroom[] = [];

    for (let classroom of data) {
      classrooms.push(await this.findOne({
          where: {
            id: classroom.id
          },
        }, relations)
      );
    }

    return {
      data: classrooms,
      meta: meta
    }
  }
}
