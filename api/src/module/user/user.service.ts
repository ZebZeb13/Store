import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CategoryService } from '../category/category.service';
import { IdInput } from '../../common/dto/id.input';
import { UserErrorException, UserError } from './exception/error.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,
  ) {}

  async showAll(page: number = 1) {
    const users = await this.userRepository.find({
      relations: ['categoryConnection'],
      // take: 25,
      // skip: 25 * (page - 1),
    });
    return await users.map(user => user);
  }

  async read(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: [],
    });
    return user;
  }

  async findOneByID(id: number) {
    const user = await this.userRepository.findOne(id, {
      relations: ['categoryConnection'],
    });
    return user;
  }

  async removeOneByID(data: IdInput) {
    const user = await this.userRepository.findOne(data.id, {
      relations: ['categoryConnection'],
    });
    if (!user) {
      throw new UserErrorException(UserError.NOT_FOUND);
    }
    if (user.categoryConnection) {
      await this.categoryService.removeCreatorByID({id: user.id});
    }
    return this.userRepository.remove(user);
  }
}
