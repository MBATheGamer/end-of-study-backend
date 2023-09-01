import { Injectable } from '@nestjs/common';
import { Classroom } from './classroom.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateResult } from 'src/common/paginate-result.interface';

@Injectable()
export class ClassroomService extends AbstractService<Classroom> {
  constructor(@InjectRepository(Classroom) repository: Repository<Classroom>) {
    super(repository);
  }
  
  public async paginateBySort(field: string, order: "ASC" | "DESC", page = 1, take = 10, relations = []) {
    const conditions: FindManyOptions<Classroom> = {
      order: {},
      take: take,
      skip: (page - 1) * take,
      relations
    };

    if (field === "department") conditions.order = {
      department :{
        name: order
      }
    };
    else conditions["order"][field] = order;

    return await this.paginateByCondition(conditions, page, take);
  }

  public async paginateBySearch(keyword: string, field: string, page = 1, take = 10, relations = []): Promise<PaginateResult<Classroom>>  {
    const conditions: FindManyOptions<Classroom> = {
      where: {},
      take: take,
      skip: (page - 1) * take,
      relations
    };

    if (field === "department") conditions.where = {
      department :{
        name: Like(`%${keyword}%`)
      }
    };
    else conditions["where"][field] = Like(`%${keyword}%`);

    return await this.paginateByCondition(conditions, page, take);
  }
}
