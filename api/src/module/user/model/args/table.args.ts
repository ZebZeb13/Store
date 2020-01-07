import { Field, ArgsType, Int } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';
import { PaginationArgs } from '../../../../common/dto/pagination.args';

@ArgsType()
export class UserTableArgs extends PaginationArgs {
    @Field(type => String, { nullable: true })
    search?: string;

    @Field(type => String, { nullable: true })
    sortingColumn?: string;

    @Field(type => String, { nullable: true })
    sortingDirection?: 'asc' | 'desc';
}
