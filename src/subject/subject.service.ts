import { Injectable } from '@nestjs/common';
import { Subject } from './subject.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateResult } from '../common/paginate-result.interface';

@Injectable()
export class SubjectService extends AbstractService<Subject> {
  constructor(@InjectRepository(Subject) repository: Repository<Subject>) {
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
  ): Promise<PaginateResult<Subject>> {
    const conditions: FindManyOptions<Subject> = {
      order: {},
      where: {},
      take: take,
      skip: (page - 1) * take,
      relations
    };

    if (orderField && order) {
      if (orderField === "classroom") conditions.order = {
        classroom :{
          name: order
        }
      }
      else if (orderField === "teacher") conditions.order = {
        teacher :{
          firstName: order
        }
      }
      else conditions["order"][orderField] = order;
    }

    if (searchField && keyword) {
      if (searchField === "classroom") conditions.where = {
      classroom :{
        name: Like(`%${keyword}%`)
      }
    }
    else if (searchField === "teacher") {
      conditions.where = 
        {
          teacher :[
            { firstName: Like(`%${keyword}%`) },
            { lastName: Like(`%${keyword}%`) },
          ],
      };
    }
    else conditions["where"][searchField] = Like(`%${keyword}%`);
    }

    return await this.paginateByCondition(conditions, page, take);
  }
}
