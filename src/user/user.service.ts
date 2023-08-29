import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../common/abstract.service';
import { PaginateResult } from '../common/paginate-result.interface';

@Injectable()
export class UserService extends AbstractService<User> {
  public constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

  public async paginate(page = 1, take = 15, relations = []): Promise<PaginateResult> {
    const {data, meta} = await super.paginate(page, take, relations);

    return {
      data: data.map(user => {
        const {password, ...data} = user;
        return data;
      }),
      meta: meta
    }
  }

  public async findByRole(roleId: number, relations = []): Promise<User[]> {
    let users = await super.find(relations);
    return users.filter(user => user.role.id === roleId);
  }
}
