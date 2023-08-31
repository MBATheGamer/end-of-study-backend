import { Injectable } from '@nestjs/common';
import { DeleteResult, FindOneOptions, Like, Repository, UpdateResult } from 'typeorm';
import { PaginateResult } from './paginate-result.interface';

@Injectable()
export abstract class AbstractService<T> {
  protected readonly repository: Repository<T>;

  protected constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  public async paginate(page = 1, take = 15, relations = []): Promise<PaginateResult<T>> {
    const [data, total] = await this.repository.findAndCount({
      take: take,
      skip: (page - 1) * take,
      relations
    });

    return {
      data: data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / take)
      }
    }
  }
  public async paginateBySort(field: string, order: "ASC" | "DESC", page = 1, take = 15, relations = []) {
    const [data, total] = await this.repository.createQueryBuilder()
      .orderBy(field, order)
      .skip((page - 1) * take)
      .take(take)
      .getManyAndCount();


    return {
      data: data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / take)
      }
    }
  }

  public async paginateBySearch(keyword: string, field: string, page = 1, take = 15) {
    const [data, total] = await this.repository.createQueryBuilder()
      .where(`${field} like :keyword`, {
        keyword: `%${keyword}%`
      })
      .skip((page - 1) * take)
      .take(take)
      .getManyAndCount();

    return {
      data: data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / take)
      }
    }
  }

  public async create(data: T): Promise<T> {
    return await this.repository.save(data);
  }

  public async find(relations = []): Promise<T[]> {
    return await this.repository.find({relations});
  }

  public async findOne(conditions: FindOneOptions<T>, relations = []): Promise<T> {
    conditions["relations"] = relations;
    return await this.repository.findOne(conditions);
  }

  public async update(id: number, data: any): Promise<UpdateResult> {
    return await this.repository.update(id, data);
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
