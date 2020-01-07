import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { IntTemplateLinker } from "./templateLinker.entity";
import { template } from "@babel/core";
import { MainTemplate } from "../../../common/entity/mainTemplate.entity";
import { IntUnity } from "./unity.entity";
@Entity()
export class IntTemplate extends MainTemplate {
  @Column("int")
  min: Number;

  @Column("int")
  max: number;

  @ManyToOne(type => IntUnity, unity => unity.templates)
  unity: IntUnity;

  @OneToMany(type => IntTemplateLinker, template => template.id)
  templates: IntTemplateLinker[];
}
