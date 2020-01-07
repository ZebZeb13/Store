import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

export abstract class MainLinker {
  @PrimaryGeneratedColumn()
  id: number;
}
