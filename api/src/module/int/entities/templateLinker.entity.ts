import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { IntTemplate } from './template.entity';
import { template } from '@babel/core';
import { IntLinker } from './linker.entity';
import { ObjectTemplate } from '../../object/entities/template.entity';
import { MainTemplateLinker } from '../../../common/entity/mainTemplateLinker.entity';
@Entity()
export class IntTemplateLinker extends MainTemplateLinker {
  @ManyToOne(type => IntTemplate, template => template.templates)
  @JoinColumn()
  template: IntTemplate;

  @ManyToOne(
    type => ObjectTemplate,
    objectTemplate => objectTemplate.stringTemplates,
  )
  objectTemplate: ObjectTemplate;

  @OneToMany(type => IntLinker, linker => linker.template)
  linker: IntLinker[];
}
