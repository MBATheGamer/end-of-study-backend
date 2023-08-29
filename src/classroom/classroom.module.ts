import { Module } from '@nestjs/common';
import { ClassroomController } from './classroom.controller';
import { ClassroomService } from './classroom.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from './classroom.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Classroom]),
    CommonModule
  ],
  controllers: [ClassroomController],
  providers: [ClassroomService]
})
export class ClassroomModule {}
