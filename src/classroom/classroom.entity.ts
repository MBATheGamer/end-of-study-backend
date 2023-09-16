import { Department } from "../department/department.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("classrooms")
export class Classroom {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({unique: true})
  name: string;

  @Column({nullable: true, type: "longtext"})
  description: string;

  @ManyToOne(_ => Department)
  @JoinColumn({name: "department_id"})
  department: Department;
}
