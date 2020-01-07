import { Field, ArgsType, Int } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(type => Int)
  @IsNotEmpty()
  page: number;

  @Field(type => Int)
  @IsNotEmpty()
  pageSize: number;
}
