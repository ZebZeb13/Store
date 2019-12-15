import { PrimaryGeneratedColumn, Column } from "typeorm";
import { Length } from "class-validator";

export abstract class MainTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  @Length(0, 500)
  name: string;
}
