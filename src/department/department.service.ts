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

  

  public async paginate(
    order: "ASC" | "DESC",
    keyword = "",
    page = 1,
    take = 10,
    relations = []
  ): Promise<PaginateResult<Department>> {
    const conditions: FindManyOptions<Department> = {
      order: {},
      where: {},
      take: take,
      skip: (page - 1) * take,
      relations
    };

    if (order) {
      conditions["order"]["name"] = order;
    }

    if (keyword) {
      conditions["where"]["name"] = Like(`${keyword}%`);
    }

    return await this.paginateByCondition(conditions, page, take);
  }
}
