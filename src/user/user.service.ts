import { Injectable } from '@nestjs/common';
import { User } from './models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../common/abstract.service';
import { PaginateResult } from '../common/paginate-result.interface';
import { FindManyOptions, FindOptions, FindOptionsOrder, Like, Repository } from 'typeorm';

@Injectable()
export class UserService extends AbstractService<User> {
  public constructor(@InjectRepository(User) repository: Repository<User>) {
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
  ): Promise<PaginateResult<User>> {
    const conditions: FindManyOptions<User> = {
      order: {},
      where: {},
      take: take,
      skip: (page - 1) * take,
      relations
    };

    if (orderField && order) {
      if (orderField === "role") conditions.order = {
        role :{
          id: order
        }
      };
      else conditions["order"][orderField] = order;
    }

    if (searchField && keyword) {
      if (searchField === "role") conditions.where = {
        role :{
          name: Like(`${keyword}%`)
        }
      };
      else conditions["where"][searchField] = Like(`${keyword}%`);
    }

    return await this.paginateByCondition(conditions, page, take);
  }

  public async findByRole(roleId: number, relations = []): Promise<User[]> {
    let users = await super.find(relations);
    return users.filter(user => user.role.id === roleId);
  }
}
