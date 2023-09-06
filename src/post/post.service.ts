import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstract.service';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService extends AbstractService<Post> {
  constructor(@InjectRepository(Post) repository: Repository<Post>) {
    super(repository);
  }
}
