import { Field, ArgsType, Int } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class IdsArgs {
  @Field(type => [Int])
  @IsNotEmpty()
  ids: number[];
}
