import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("permissions")
export class Permission {
  @PrimaryColumn()
  id?: number;

  @Column({unique: true})
  name: string;
}