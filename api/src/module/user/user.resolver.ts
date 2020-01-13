import { Resolver, Query, Args, Mutation, ResolveProperty, Parent } from '@nestjs/graphql';

import { UseGuards, Inject, forwardRef, UseInterceptors, UseFilters } from '@nestjs/common';
import { GqlAuthGuard } from '../../common/guards/graphql-auth.guard';
import { GqlUser } from '../../common/decorators/gqlUser.decorators';

import { UserService } from './user.service';
import { UserRO } from './dto/result.dto';
import { User, UserRole } from './entities/user.entity';

import { Auth } from '../auth/model/auth';
import { PaginationArgs } from '../../common/dto/pagination.args';
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
import { IdsInput } from '../../common/dto/ids.input';
import { ResultTableOutput } from './dto/resultTable.output';
import { UpdateInput } from './dto/update.input';
import { UserTableArgs } from './dto/table.args';
import UpdateRolesInput from './dto/updateRoles.input';
import { MailService } from '../mail/mail.service';


@Resolver(of => User)
// @UseInterceptors(LoggingInterceptor)
// @UseGuards(GqlAuthGuard, RolesGuard)
export class UserResolver {
  constructor(
    private userService: UserService,
    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,
    @Inject(forwardRef(() => MailService))
    private mailService: MailService,
  ) { }
  // --------------------------------------------------------------------------------------------
  @Query(() => User)
  async whoami(@GqlUser() user: User): Promise<User> {
    return await this.userService.findOneByID(user.id);
  }

  @Query(() => User)
  async user(@Args() { id }: IdArgs): Promise<User> {
    return await this.userService.findOneByID(id);
  }

  @Query(() => ResultTableOutput)
  // @Roles(UserRole.ADMIN)
  async users(@Args() { page, pageSize, search, sortingColumn, sortingDirection }: UserTableArgs): Promise<ResultTableOutput> {
    return await this.userService.find({ page, pageSize, search, sortingColumn, sortingDirection });
  }


  // --------------------------------------------------------------------------------------------

  @Mutation(() => User)
  // @Roles(UserRole.ADMIN)
  async updateUser(@Args('data') { id, firstName, lastName }: UpdateInput): Promise<User> {
    const user = await this.userService.findOneByID(id);
    const userResult = await this.userService.update(user, firstName, lastName);
    return userResult;
  }

  @Mutation(() => User)
  // @Roles(UserRole.ADMIN)
  async updateUserRoles(@Args('data') { id, roles }: UpdateRolesInput): Promise<User> {
    const user = await this.userService.findOneByID(id);
    const userResult = await this.userService.updateRoles(user, roles);
    return userResult;
  }


  @Mutation(() => ResultOutput)
  async removeMe(@GqlUser() user: User): Promise<ResultOutput> {
    const userResult = await this.userService.remove(user);
    return {
      success: userResult.id === undefined ? true : false,
      description: 'Remove user',
    };
  }


  @Mutation(() => ResultOutput)
  // @Roles(UserRole.ADMIN)
  async removeUser(@Args('data') { id }: IdInput): Promise<ResultOutput> {
    const user = await this.userService.findOneByID(id);
    const userResult = await this.userService.remove(user);
    return {
      success: userResult.id === undefined ? true : false,
      description: 'Remove user',
    };
  }

  @Mutation(() => ResultOutput)
  // @Roles(UserRole.ADMIN)
  async removeUsers(@Args('data') { ids }: IdsInput): Promise<ResultOutput> {
    const userResult = await this.userService.removeByIDs(ids);
    return {
      success: userResult === false ? false : true,
      description: 'Remove users',
    };
  }

  @Mutation(() => Boolean)
  // @Roles(UserRole.ADMIN)
  async generateUsers(): Promise<boolean> {
    return this.userService.generate();
  }
  @Mutation(() => Boolean)
  // @Roles(UserRole.ADMIN)
  async deleteGeneratedUsers(): Promise<boolean> {
    return this.userService.deleteGenerated();
  }

  // --------------------------------------------------------------------------------------------

  @ResolveProperty()
  async categories(@Parent() parent): Promise<Category[]> {
    const { id } = parent;
    return await this.categoryService.findAllByCreator(id);
  }
}
