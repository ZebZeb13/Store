import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, getRepository } from 'typeorm';

import { User } from './entities/user.entity';
import { CategoryService } from '../category/category.service';
import { IdInput } from '../../common/dto/id.input';
import { UserErrorException, UserError } from './exception/error.exception';
import { IdsInput } from 'src/common/dto/ids.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,
  ) { }

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
    if (!user) {
      throw new UserErrorException(UserError.NOT_FOUND);
    }
    return user;
  }

  async find(page: number = 0, pageSize: number = 5,
    search: string | undefined,
    sortingColumn: string | undefined,
    sortingDirection: string | undefined) {
    let req = getRepository(User).createQueryBuilder('user').select('user').take(pageSize).skip(pageSize * (page));
    if (search) {
      const searchColumn = ['id', 'firstName', 'lastName', 'email'];
      searchColumn.forEach((column, index) => {
        if (index === 0) {
          req = req.where('user.' + column + ' like :search', { search: '%' + search + '%' });
        } else {
          req = req.orWhere('user.' + column + ' like :search', { search: '%' + search + '%' });
        }
      });
    }
    if (sortingColumn && sortingDirection) {
      req = req.orderBy('user.' + sortingColumn, sortingDirection.toUpperCase() === 'ASC' ? 'ASC' : 'DESC');
    }
    const users = await req.getMany();
    const totalCount = await req.getCount();
    return { users, totalCount };
  }


  async updateOneByID(user: User, firstName?: string, lastName?: string) {
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = name;
    }
    return await this.userRepository.save(user);
  }

  async removeOneByID(id: number) {
    const user = await this.userRepository.findOne(id, {
      relations: ['categoryConnection'],
    });
    if (!user) {
      throw new UserErrorException(UserError.NOT_FOUND);
    }
    if (user.categoryConnection) {
      await this.categoryService.removeCreatorByID({ id: user.id });
    }
    return this.userRepository.remove(user);
  }

  async removeOneByIDs(data: IdsInput) {
    const users = await this.userRepository.find({
      where: {
        id: In(data.ids),
      },
      relations: ['categoryConnection'],
    });
    if (!users) {
      throw new UserErrorException(UserError.NOT_FOUND);
    }
    users.forEach(user => {
      if (user.categoryConnection) {
        this.categoryService.removeCreatorByID({ id: user.id });
      }
    });
    return this.userRepository.remove(users);
  }

  async generate() {
    const users: User[] = [];
    for (let index = 0; index < 100; index++) {
      const newUser = await new User();
      newUser.email = 'generated-' + index + '@zeb.com';

      newUser.firstName = 'zeb-' + index;
      newUser.lastName = 'generated';
      newUser.password = '12345678';

      users.push(newUser);
    }
    this.userRepository.save(users);
    return true;
  }

  async deleteGenerated() {
    const users = await this.userRepository.find({ where: { lastName: 'generated' } });
    if (users) {
      this.userRepository.remove(users);
      return true;
    }
    return false;
  }
}
