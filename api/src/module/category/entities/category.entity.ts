import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  TreeLevelColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectTemplate } from '../../object/entities/template.entity';
import { User } from '../../user/entities/user.entity';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
@Tree('closure-table')
export class Category {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({unique: true})
  name: string;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;

  @Field(() => User, {nullable: true})
  creator: User;

  @ManyToOne(
    type => User,
    creator => creator.objectTemplates,
  )
  @JoinColumn()
  creatorConnection: User;

  @ManyToMany(
    type => ObjectTemplate,
    objectTemplate => objectTemplate.categories,
    {
      eager: true,
    },
  )
  objectTemplate: ObjectTemplate[];
}
