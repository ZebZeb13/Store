import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { IntTemplate } from "./template.entity";
@Entity()
export class IntUnity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  public name: string;

  @Column({ length: 500 })
  public value: string;

  @Column("boolean")
  public smart: boolean;

  @OneToMany(type => IntTemplate, template => template.unity)
  templates: IntTemplate[];
}
