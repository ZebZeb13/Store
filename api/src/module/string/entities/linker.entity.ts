import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { StringTemplateLinker } from './templateLinker.entity';
import { ObjectItem } from '../../../module/object/entities/item.entity';
import { MainLinker } from '../../../common/entity/mainLinker.entity';
@Entity()
export class StringLinker extends MainLinker {
  @Column({ length: 500 })
  value: string;

  @ManyToOne(type => StringTemplateLinker, template => template.id, {
    eager: true,
  })
  template: StringTemplateLinker;

  @ManyToOne(type => ObjectItem, object => object.strings)
  object: ObjectItem;
}
