import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';

import { ObjectTemplate } from '../../object/entities/template.entity';
import { ObjectItem } from '../../object/entities/item.entity';
import { Category } from '../../category/entities/category.entity';
import { ObjectType, Field, registerEnumType, Int } from 'type-graphql';

export enum UserRole {
  ADMIN = 'admin',
  DEVELOPER = 'developer',
}

registerEnumType(UserRole, {name: 'UserRole', description: 'user roles'});

@ObjectType()
@Entity('user')
export class User {

  @Field(() => Int!)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Date!)
  @CreateDateColumn({ type: 'timestamp' })
  registeredAt: number;

  @Field(() => Date!)
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;

  @Field()
  @Column({
    type: 'text',
  })
  firstName: string;

  @Field()
  @Column({
    type: 'text',
  })
  lastName: string;

  @Field()
  @Column({
    unique: true,
  })
  email: string;

  @Exclude()
  @Column('text')
  password: string;

  @Field(() => [UserRole])
  // @Column('simple-array')
  @Column({
    type: 'set',
    enum: UserRole,
    default: [],
})
  roles: UserRole[];

  @OneToMany(
    type => ObjectTemplate,
    objectTemplate => objectTemplate.creator,
  )
  @JoinColumn()
  objectTemplates: Promise<ObjectTemplate[]>;

  @OneToMany(
    type => ObjectItem,
    objects => objects.creator,
  )
  @JoinColumn()
  objects: ObjectItem[];

  @Field(() => [Category], {nullable: true})
  categories: Category[];

  @OneToMany(
    type => Category,
    categoryConnection => categoryConnection.creatorConnection,
  )
  categoryConnection: Promise<Category[]>;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(showToken: boolean = true) {
    const { id, registeredAt, updatedAt, email, firstName, lastName, roles } = this;

    const responseObject = {
      id,
      registeredAt,
      updatedAt,
      email,
      firstName,
      lastName,
      roles,
    };

    return responseObject;
  }
}
