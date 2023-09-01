import { Injectable } from '@nestjs/common';
import { User } from './models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../common/abstract.service';
import { PaginateResult } from '../common/paginate-result.interface';
import { FindManyOptions, FindOptions, FindOptionsOrder, Like, Repository } from 'typeorm';
import { Role } from 'src/role/role.entity';

@Injectable()
export class UserService extends AbstractService<User> {
  public constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

  public async paginate(page = 1, take = 10, relations = []): Promise<PaginateResult<User>> {
    const {data, meta} = await super.paginate(page, take, relations);

    return {
      data: data.map(user => {
        const {password, ...data} = user;
        return data;
      }),
      meta: meta
    }
  }
  
  public async paginateBySort(field: string, order: "ASC" | "DESC", page = 1, take = 10, relations = []): Promise<PaginateResult<User>> {
    const conditions: FindManyOptions<User> = {
      order: {},
      take: take,
      skip: (page - 1) * take,
      relations
    };

    if (field === "role") conditions.order = {
      role :{
        id: order
      }
    };
    else conditions["order"][field] = order;

    return await this.paginateByCondition(conditions, page, take);
  }

  public async paginateBySearch(keyword: string, field: string, page = 1, take = 10, relations = []): Promise<PaginateResult<User>>  {
    const conditions: FindManyOptions<User> = {
      where: {},
      take: take,
      skip: (page - 1) * take,
      relations
    };

    if (field === "role") conditions.where = {
      role :{
        name: Like(`%${keyword}%`)
      }
    };
    else conditions["where"][field] = Like(`%${keyword}%`);

    return await this.paginateByCondition(conditions, page, take);
  }

  public async findByRole(roleId: number, relations = []): Promise<User[]> {
    let users = await super.find(relations);
    return users.filter(user => user.role.id === roleId);
  }
}
