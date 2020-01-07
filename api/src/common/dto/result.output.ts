import { Field, ObjectType } from 'type-graphql';
import {User} from '../../module/user/entities/user.entity';
@ObjectType()
export class ResultOutput {
  @Field({ description: 'result' })
  success: boolean;

  @Field(type => String)
  description: string;
}
