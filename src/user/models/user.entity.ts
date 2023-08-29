import { Exclude } from "class-transformer";
import { Role } from "../../role/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Subject } from "src/subject/subject.entity";
import { Classroom } from "src/classroom/classroom.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({unique: true})
  cin: string;

  @Column({name: "first_name"})
  firstName: string;

  @Column({name: "last_name"})
  lastName: string;

  @Column({unique: true})
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({name: "date_of_birth" , nullable: true})
  dateOfBirth?: Date;

  @Column({nullable: true})
  mobile?: string;

  @Column({nullable: true})
  address?: string;

  @ManyToOne(() => Role)
  @JoinColumn({name: "role_id"})
  role: Role;

  @ManyToOne(() => Classroom, {nullable: true})
  @JoinColumn({name: "classroom_id"})
  classroom?: Classroom;
}