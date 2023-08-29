import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { RoleModule } from './role/role.module';
import { DepartmentModule } from './department/department.module';
import { ClassroomModule } from './classroom/classroom.module';
import { SubjectModule } from './subject/subject.module';
import { PermissionModule } from './permission/permission.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "end_of_study",
      entities: entities,
      synchronize: true
    }),
    UserModule,
    AuthModule,
    CommonModule,
    RoleModule,
    DepartmentModule,
    ClassroomModule,
    SubjectModule,
    PermissionModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
