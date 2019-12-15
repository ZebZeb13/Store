import { Module } from '@nestjs/common';
import { ObjectService } from './object.service';
import { ObjectController } from './object.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectItem } from './entities/item.entity';
import { ObjectTemplate } from './entities/template.entity';

import { StringTemplate } from '../../module/string/entities/template.entity';
import { StringTemplateLinker } from '../../module/string/entities/templateLinker.entity';
import { StringLinker } from '../../module/string/entities/linker.entity';

import { IntTemplateLinker } from '../int/entities/templateLinker.entity';
import { IntLinker } from '../int/entities/linker.entity';
import { IntTemplate } from '../int/entities/template.entity';
import { IntUnity } from '../int/entities/unity.entity';

import { Category } from '../category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ObjectItem]),
    TypeOrmModule.forFeature([ObjectTemplate]),
    TypeOrmModule.forFeature([Category]),
    TypeOrmModule.forFeature([StringTemplate]),
    TypeOrmModule.forFeature([StringTemplateLinker]),
    TypeOrmModule.forFeature([StringLinker]),
    TypeOrmModule.forFeature([IntTemplate]),
    TypeOrmModule.forFeature([IntTemplateLinker]),
    TypeOrmModule.forFeature([IntLinker]),
    TypeOrmModule.forFeature([IntUnity]),
  ],
  providers: [ObjectService],
  controllers: [ObjectController],
})
export class ObjectModule {}
