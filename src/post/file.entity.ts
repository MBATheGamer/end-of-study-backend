import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity("files")
export class File {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  path: string;

  @ManyToOne(_ => Post, post => post.files, {
    onDelete: "CASCADE"
  })
  @JoinColumn({name: "post_id"})
  post: Post;
}
