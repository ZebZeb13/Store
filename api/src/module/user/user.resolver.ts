import { Resolver, Query, Args, Mutation, ResolveProperty, Parent } from '@nestjs/graphql';

import { UseGuards, Inject, forwardRef, UseInterceptors, UseFilters } from '@nestjs/common';
import { GqlAuthGuard } from '../../common/guards/graphql-auth.guard';
import { GqlUser } from '../../common/decorators/gqlUser.decorators';

import { UserService } from './user.service';
import { UserRO } from './dto/result.dto';
import { User, UserRole } from './entities/user.entity';

import { Auth } from '../auth/model/auth';
import { PaginationArgs } from './model/args/pagination.args';
import { UserEmailArgs } from './model/args/useremail.args';
import { CategoryResolver } from '../category/category.resolver';
import { Category } from '../category/entities/category.entity';
import { CategoryService } from '../category/category.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { IdInput } from '../../common/dto/id.input';
import { ResultOutput } from '../../common/dto/result.output';
import { IdArgs } from '../../common/dto/id.args';
import { LoggingInterceptor } from '../../common/logger/interceptor/logging.interceptor';
import { HttpExceptionFilter } from '../../common/filter/http-exception.filer';

@Resolver(of => User)
@UseInterceptors(LoggingInterceptor)
@UseGuards(GqlAuthGuard, RolesGuard)
export class UserResolver {
  constructor(
    private userService: UserService,
    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,
  ) { }

  @Query(() => User)
  async whoami(@GqlUser() user: User): Promise<User> {
    return await this.userService.findOneByID(user.id);
  }

  @Query(() => User)
  async user(@Args() data: IdArgs): Promise<User> {
    return await this.userService.findOneByID(data.id);
  }

  @Query(() => [User])
  // @Roles(UserRole.ADMIN)
  async users(@Args() { page }: PaginationArgs): Promise<User[]> {
    return await this.userService.showAll(page);
  }

  @Mutation(() => ResultOutput)
  async removeMe(@GqlUser() user: User ): Promise<ResultOutput> {
    const userResult = await this.userService.removeOneByID({id: user.id});
    return {
      success: userResult.id === undefined ? true : false,
      description: 'Remove user',
    };
  }


  @Mutation(() => ResultOutput)
  @Roles(UserRole.ADMIN)
  async removeUser(@Args('data') data: IdInput, @GqlUser() user: User ): Promise<ResultOutput> {
    const userResult = await this.userService.removeOneByID(data);
    return {
      success: userResult.id === undefined ? true : false,
      description: 'Remove user',
    };
  }

  @ResolveProperty()
  async categories(@Parent() parent): Promise<Category[]> {
    const { id } = parent;
    return await this.categoryService.findAllByCreator(id);
  }
}
