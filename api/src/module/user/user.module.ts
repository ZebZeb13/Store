import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { CategoryService } from '../category/category.service';
import { CategoryModule } from '../category/category.module';
import { MailModule } from '../mail/mail.module';


@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => CategoryModule), forwardRef(() => MailModule)],
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule { }
