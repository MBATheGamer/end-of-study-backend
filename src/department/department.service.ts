import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../common/abstract.service';
import { Department } from './department.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { PaginateResult } from 'src/common/paginate-result.interface';

@Injectable()
export class DepartmentService extends AbstractService<Department> {
  constructor(@InjectRepository(Department) repository: Repository<Department>) {
    super(repository);
  }

  public async paginateBySort(order: "ASC" | "DESC", page = 1, take = 10, relations = []) {
    const conditions: FindManyOptions<Department> = {
      order: {
        name: order
      },
      take: take,
      skip: (page - 1) * take,
      relations
    };

    return await this.paginateByCondition(conditions, page, take);
  }

  public async paginateBySearch(keyword: string, page = 1, take = 10, relations = []): Promise<PaginateResult<Department>>  {
    const conditions: FindManyOptions<Department> = {
      where: {
        name: Like(`%${keyword}%`)
      },
      take: take,
      skip: (page - 1) * take,
      relations
    };

    return await this.paginateByCondition(conditions, page, take);
    }
}
