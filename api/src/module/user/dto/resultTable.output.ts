import { Field, ObjectType } from 'type-graphql';
import { User } from '../entities/user.entity';
@ObjectType()
export class ResultTableOutput {
  @Field(type => [User])
  users: User[];

  @Field(type => Number)
  totalCount: number;
}
