import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../common/abstract.service';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { PaginateResult } from 'src/common/paginate-result.interface';

@Injectable()
export class DepartmentService extends AbstractService<Department> {
  constructor(@InjectRepository(Department) repository: Repository<Department>) {
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

  public async paginateBySearch(keyword: string, field: string, page = 1, take = 15, relations = []): Promise<PaginateResult<Department>>  {
    const {data, meta} = await super.paginateBySearch(keyword, field, page, take);

    const classrooms: Department[] = [];

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
