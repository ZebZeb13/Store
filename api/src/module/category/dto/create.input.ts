import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateInput {
  @Field()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}
