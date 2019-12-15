import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { IntTemplateLinker } from "./templateLinker.entity";
import { template } from "@babel/core";
import { ObjectItem } from "../../object/entities/item.entity";
import { MainLinker } from "../../../common/entity/mainLinker.entity";
@Entity()
export class IntLinker extends MainLinker {
  @Column("int")
  public value: number;

  @ManyToOne(type => IntTemplateLinker, template => template.id)
  template: IntTemplateLinker;

  @ManyToOne(type => ObjectItem, object => object.strings)
  public object!: ObjectItem;
}
