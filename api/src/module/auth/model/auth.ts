import { Field, ObjectType } from 'type-graphql';
import {User} from '../../user/entities/user.entity';
@ObjectType()
export class Auth {
  @Field({ description: 'JWT Beare token' })
  token: string;

  @Field(type => User)
  user: User;
}
