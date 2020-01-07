import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  JoinColumn,
  ManyToMany,
  Tree,
  TreeChildren,
  TreeParent,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectItem } from './item.entity';
import { StringTemplateLinker } from '../../../module/string/entities/templateLinker.entity';
import { IntTemplateLinker } from '../../int/entities/templateLinker.entity';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';
@Entity()
@Tree('closure-table')
export class ObjectTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @OneToMany(type => ObjectItem, template => template.id)
  templates: ObjectItem[];

  @TreeChildren()
  children: ObjectTemplate[];

  @TreeParent()
  parent: ObjectTemplate;

  @ManyToOne(
    type => User,
    creator => creator.objectTemplates,
  )
  creator: User;

  @OneToMany(
    type => StringTemplateLinker,
    StringTemplate => StringTemplate.objectTemplate,
  )
  @JoinColumn()
  stringTemplates: StringTemplateLinker[];

  @OneToMany(
    type => IntTemplateLinker,
    IntTemplate => IntTemplate.objectTemplate,
  )
  @JoinColumn()
  intTemplates: IntTemplateLinker[];

  @ManyToMany(type => Category, category => category.objectTemplate)
  @JoinTable()
  categories: Category[];
}
