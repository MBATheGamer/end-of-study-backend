import { Module } from '@nestjs/common';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subject]),
    CommonModule
  ],
  controllers: [SubjectController],
  providers: [SubjectService],
  exports: [SubjectService]
})
export class SubjectModule {}
