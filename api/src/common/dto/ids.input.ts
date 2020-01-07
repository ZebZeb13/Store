import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class IdsInput {
  @Field(type => [Int])
  @IsNotEmpty()
  ids: number[];
}
