import { Field, ArgsType, Int } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class UserIdArgs {
  @Field(type => Int)
  @IsNotEmpty()
  userId: number;
}
