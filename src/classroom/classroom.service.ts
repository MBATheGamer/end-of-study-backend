import { Injectable } from '@nestjs/common';
import { Classroom } from './classroom.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateResult } from '../common/paginate-result.interface';

@Injectable()
export class ClassroomService extends AbstractService<Classroom> {
  constructor(@InjectRepository(Classroom) repository: Repository<Classroom>) {
    super(repository);
  }

  public async paginate(
    order: "ASC" | "DESC",
    orderField = "",
    searchField = "",
    keyword = "",
    page = 1,
    take = 10,
    relations = []
  ): Promise<PaginateResult<Classroom>> {
    const conditions: FindManyOptions<Classroom> = {
      order: {},
      where: {},
      take: take,
      skip: (page - 1) * take,
      relations
    };

    if (orderField && order) {
      if (orderField === "department") conditions.order = {
        department :{
          name: order
        }
      }
      else conditions["order"][orderField] = order;
    }

    if (searchField && keyword) {
      if (searchField === "department") conditions.where = {
        department :{
          name: Like(`${keyword}%`)
        }
      }
      else conditions["where"][searchField] = Like(`${keyword}%`);
    }

    return await this.paginateByCondition(conditions, page, take);
  }
}
