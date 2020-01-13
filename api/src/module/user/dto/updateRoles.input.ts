import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field, Int } from 'type-graphql';
import { IdInput } from '../../../common/dto/id.input';
import { UserRole } from '../entities/user.entity';

@InputType()
export default class UpdateRolesInput extends IdInput {
  @Field(type => [UserRole])
  roles: UserRole[];

}
