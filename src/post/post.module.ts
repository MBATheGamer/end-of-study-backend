import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { Post } from './post.entity';
import { File } from './file.entity';
import { SubjectModule } from '../subject/subject.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, File]),
    CommonModule,
    SubjectModule
  ],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
