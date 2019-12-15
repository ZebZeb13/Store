import { PrimaryGeneratedColumn, Column } from "typeorm";
import { IsInt, Min } from "class-validator";

export abstract class MainTemplateLinker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  @IsInt()
  @Min(0)
  field: number;
}
