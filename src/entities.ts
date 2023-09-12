import { Classroom } from "./classroom/classroom.entity";
import { Department } from "./department/department.entity";
import { Permission } from "./permission/permission.entity";
import { File } from "./post/file.entity";
import { Post } from "./post/post.entity";
import { Role } from "./role/role.entity";
import { Subject } from "./subject/subject.entity";
import { User } from "./user/models/user.entity";

export const entities = [Classroom, Department, File, Post, Permission, Role, Subject, User]