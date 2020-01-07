import { Field, ArgsType, Int } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class IdArgs {
  @Field(type => Int)
  @IsNotEmpty()
  id: number;
}
