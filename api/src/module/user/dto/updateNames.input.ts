import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field, Int } from 'type-graphql';
import { IdInput } from '../../../common/dto/id.input';

@InputType()
export class UpdateInput extends IdInput {
  @Field(type => String, { nullable: true })
  firstName: string;

  @Field(type => String, { nullable: true })
  lastName: string;
}
