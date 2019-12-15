import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class LinkUser {
  @Field()
  @IsNotEmpty()
  categoryId: number;

  @Field()
  @IsNotEmpty()
  userId: number;
}
