import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateInput } from './dto/create.input';
import { User } from '../user/entities/user.entity';
import { LinkUser } from './dto/linkUser.input';
import { IdInput } from '../../common/dto/id.input';
import { CategoryErrorException, CategoryError } from './exception/error.exception';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      relations: ['creatorConnection'],
    });
  }

  async findAllByCreator(id: number): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: {
        creatorConnection: { id },
      },
      relations: ['creatorConnection'],
    });
  }

  async findOnByID(id: number): Promise<Category> {
    return await this.categoryRepository.findOne(id, {
      relations: ['children'],
    });
  }

  async create(data: CreateInput, user: User) {
    const category = await this.categoryRepository.find({ where: { name: data.name } });
    if (category.length > 0) {
      throw new CategoryErrorException(CategoryError.EXIST);
    }
    const newCategory = new Category();
    newCategory.name = data.name;
    newCategory.creatorConnection = user;
    return await this.categoryRepository.save(newCategory);
  }

  async removeCreatorByID(data: IdInput) {
    const categories = await this.categoryRepository.find({
      where: { creatorConnection: { id: data.id } },
      relations: ['creatorConnection'],
    });
    if (categories.length > 0) {
      const updatedCategories = categories.map((category) => {
        category.creatorConnection = null;
        return category;
      });
      return await this.categoryRepository.save(updatedCategories);
    }
    return false;
  }

  async linkUser(data: LinkUser) {
    const categoryPromise = await this.categoryRepository.findOne(data.categoryId);
    const userPromise = await this.userRepository.findOne(data.userId);
    const [category, user] = await Promise.all([categoryPromise, userPromise]);
    if (!category || !user) {
      throw new HttpException('Category/User don\'t exists', HttpStatus.BAD_REQUEST);
    }
    return category;
  }

  async createCategories() {
    const manager = getManager();

    const a1 = new Category();
    a1.name = 'a1';
    await manager.save(a1);

    const a11 = new Category();
    a11.name = 'a11';
    a11.parent = a1;
    await manager.save(a11);

    const a12 = new Category();
    a12.name = 'a12';
    a12.parent = a1;
    await manager.save(a12);

    const a111 = new Category();
    a111.name = 'a111';
    a111.parent = a11;
    await manager.save(a111);

    const a112 = new Category();
    a112.name = 'a112';
    a112.parent = a11;
    await manager.save(a112);
  }
}
