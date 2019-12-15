import { Module } from '@nestjs/common';
import { IntService } from './int.service';
import { IntController } from './int.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectItem } from '../object/entities/item.entity';
import { ObjectTemplate } from '../object/entities/template.entity';

import { IntTemplateLinker } from './entities/templateLinker.entity';
import { IntLinker } from './entities/linker.entity';
import { IntTemplate } from './entities/template.entity';
import { IntUnity } from './entities/unity.entity';

import { Category } from '../category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ObjectItem]),
    TypeOrmModule.forFeature([ObjectTemplate]),
    TypeOrmModule.forFeature([IntTemplate]),
    TypeOrmModule.forFeature([IntTemplateLinker]),
    TypeOrmModule.forFeature([IntLinker]),
    TypeOrmModule.forFeature([IntUnity]),
  ],
  providers: [IntService],
  controllers: [IntController],
})
export class IntModule {}
