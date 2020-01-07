import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { StringTemplateLinker } from './templateLinker.entity';
import { MainTemplate } from '../../../common/entity/mainTemplate.entity';
@Entity()
export class StringTemplate extends MainTemplate {
  @OneToMany(type => StringTemplateLinker, template => template.id)
  @JoinColumn()
  templates: StringTemplateLinker[];
}
