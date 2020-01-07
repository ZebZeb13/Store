import { Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // @Get()
  // findCategory(): Promise<Category[]> {
  //   return this.categoryService.findAllCategory();
  // }

  // @Get("all")
  // findAllCategories(): Promise<Category[]> {
  //   return this.categoryService.findAllCategories();
  // }

  @Post()
  createCategory(): boolean {
    this.categoryService.createCategories();
    return true;
  }
}
