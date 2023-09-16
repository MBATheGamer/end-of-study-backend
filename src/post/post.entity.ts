import { Subject } from "../subject/subject.entity";
import { File } from "./file.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column({type: "longtext"})
  content: string;

  @Column({name: "created_at"})
  createdAt: Date;

  @Column({name: "updated_at"})
  updatedAt: Date;

  @ManyToOne(_ => Subject, subject => subject.posts, {
    onDelete: "CASCADE"
  })
  @JoinColumn({name: "subject_id"})
  subject: Subject;

  @OneToMany(_ => File, file => file.post, {cascade: true})
  files?: File[];
}
