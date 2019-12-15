import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class IdInput {
  @Field(type => Int)
  @IsNotEmpty()
  id: number;
}
