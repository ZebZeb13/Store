import { Resolver, Query, Args, Mutation, ResolveProperty, Parent } from '@nestjs/graphql';

import { UseGuards, Inject, forwardRef } from '@nestjs/common';
import { GqlAuthGuard } from '../../common/guards/graphql-auth.guard';

import {Auth} from '../auth/model/auth';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateInput } from './dto/create.input';
import { LinkUser } from './dto/linkUser.input';
import { GqlUser } from '../../common/decorators/gqlUser.decorators';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Resolver(of => Category)
export class CategoryResolver {
  constructor(
    private categoryService: CategoryService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}
  @Query(() => [Category])
  @UseGuards(GqlAuthGuard)
  async categories(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  // @Query(() => Category)
  // async user(@Args('id') id: number): Promise<Category> {
  //   return (await this.categoryService.findOnByID(id));
  // }

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard)
  async createCategory(@Args('data') data: CreateInput, @GqlUser() user: User ) {
    return await this.categoryService.create(data, user);
  }

  @Mutation(() => Category)
  async linkCategoryUser(@Args('data') data: LinkUser ) {
    return await this.categoryService.linkUser(data);
  }

  @ResolveProperty()
  async creator(@Parent() parent) {
    const { creatorConnection } = parent;
    if (!creatorConnection || !creatorConnection.id) {
      return;
    }
    return await this.userService.findOneByID(creatorConnection.id);
  }
}
