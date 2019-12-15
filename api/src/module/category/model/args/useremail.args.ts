import { Field, ArgsType } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class UserEmailArgs {
  @Field(type => String)
  @IsNotEmpty()
  email: string;
}
