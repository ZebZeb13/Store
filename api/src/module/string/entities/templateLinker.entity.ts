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
import { StringTemplate } from './template.entity';
import { StringLinker } from './linker.entity';
import { ObjectTemplate } from '../../../module/object/entities/template.entity';
import { MainTemplateLinker } from '../../../common/entity/mainTemplateLinker.entity';
@Entity()
export class StringTemplateLinker extends MainTemplateLinker {
  @ManyToOne(type => StringTemplate, template => template.templates, {
    eager: true,
  })
  template: StringTemplate;

  @ManyToOne(
    type => ObjectTemplate,
    objectTemplate => objectTemplate.stringTemplates,
    {
      eager: true,
    },
  )
  objectTemplate: ObjectTemplate;

  @OneToMany(type => StringLinker, linker => linker.template)
  linker: StringLinker[];
}
