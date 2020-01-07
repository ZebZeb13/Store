import * as bcryptjs from 'bcryptjs';
import { Response } from 'express';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
// import { SignInInput } from '../graphql.schema.generated';
import { ResGql } from '../../common/decorators/resGql.decorator';
import { JwtService } from '@nestjs/jwt';
import { SignUpInputDto } from './sign-up-input.dto';
import { Auth } from './model/auth';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/signin.input';
import { SignUpInput } from './dto/signup.input';
import { HttpExceptionFilter } from '../../common/filter/http-exception.filer';
import { UseFilters } from '@nestjs/common';

@Resolver(of => Auth)

@UseFilters(new HttpExceptionFilter())
export class AuthResolver {
  constructor(private readonly jwt: JwtService, private readonly authService: AuthService) { }

  @Mutation(returns => Auth)
  async signIn(@Args('data') data: SignInInput) {
    data.email = data.email.toLowerCase();
    return await this.authService.login(data);
  }

  @Mutation(returns => Auth)
  async signUp(@Args('data') data: SignUpInput) {
    data.email = data.email.toLowerCase();
    return await this.authService.createUser(data);
  }
}
