import { Injectable } from '@nestjs/common';
import { Subject } from './subject.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateResult } from 'src/common/paginate-result.interface';

@Injectable()
export class SubjectService extends AbstractService<Subject> {
  constructor(@InjectRepository(Subject) repository: Repository<Subject>) {
    super(repository);
  }
  
  public async paginateBySort(field: string, order: "ASC" | "DESC", page = 1, take = 10, relations = []) {
    const conditions: FindManyOptions<Subject> = {
      order: {},
      take: take,
      skip: (page - 1) * take,
      relations
    };

    if (field === "classroom") conditions.order = {
      classroom :{
        name: order
      }
    };
    else if (field === "teacher") conditions.order = {
      teacher :{
        firstName: order
      }
    };
    else conditions["order"][field] = order;

    return await this.paginateByCondition(conditions, page, take);
  }

  public async paginateBySearch(keyword: string, field: string, page = 1, take = 10, relations = []): Promise<PaginateResult<Subject>>  {
    const conditions: FindManyOptions<Subject> = {
      where: {},
      take: take,
      skip: (page - 1) * take,
      relations
    };

    if (field === "classroom") conditions.where = {
      classroom :{
        name: Like(`%${keyword}%`)
      }
    };
    else if (field === "teacher") {
      conditions.where = 
        {
          teacher :[
            { firstName: Like(`%${keyword}%`) },
            { lastName: Like(`%${keyword}%`) },
          ],
      };
    }
    else conditions["where"][field] = Like(`%${keyword}%`);

    return await this.paginateByCondition(conditions, page, take);
  }
}
