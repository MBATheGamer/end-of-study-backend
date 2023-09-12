import { User } from "src/user/models/user.entity";
import { Classroom } from "../classroom/classroom.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "src/post/post.entity";

@Entity("subjects")
export class Subject {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column({nullable: true})
  description: string;

  @Column("decimal", { precision: 2, scale: 1 })
  multiplier: number;

  @Column()
  credit: number;

  @Column({name: "is_on_meet"})
  isOnMeet: boolean;

  @ManyToOne(_ => Classroom)
  @JoinColumn({name: "classroom_id"})
  classroom: Classroom;

  @ManyToOne(_ => User, user => user.subjects, {
    onDelete: "CASCADE"
  })
  @JoinColumn({name: "teacher_id"})
  teacher: User;

  @OneToMany(_ => Post, post => post.subject, {cascade: true})
  posts?: Post[];
}
