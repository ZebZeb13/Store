import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';
import { ObjectTemplate } from './template.entity';
import { StringLinker } from '../../../module/string/entities/linker.entity';
import { IntLinker } from '../../int/entities/linker.entity';
import { User } from '../../user/entities/user.entity';
@Entity()
export class ObjectItem {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @Column({ length: 500 })
  name: string;

  @ManyToOne(type => ObjectTemplate, template => template.id, {
    eager: true,
  })
  template: ObjectTemplate;

  @ManyToOne(
    type => User,
    creator => creator.objectTemplates,
  )
  creator: User;

  @OneToMany(type => StringLinker, strings => strings.object)
  @JoinColumn()
  strings: StringLinker[];

  @OneToMany(type => IntLinker, numbers => numbers.object)
  @JoinColumn()
  ints: IntLinker[];
}
