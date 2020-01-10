import { Module } from '@nestjs/common';
import { StringService } from './string.service';
import { StringController } from './string.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectItem } from '../../module/object/entities/item.entity';
import { StringTemplate } from './entities/template.entity';
import { ObjectTemplate } from '../../module/object/entities/template.entity';
import { StringTemplateLinker } from './entities/templateLinker.entity';
import { StringLinker } from './entities/linker.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([ObjectItem]),
    TypeOrmModule.forFeature([ObjectTemplate]),
    TypeOrmModule.forFeature([StringTemplate]),
    TypeOrmModule.forFeature([StringTemplateLinker]),
    TypeOrmModule.forFeature([StringLinker]),
  ],
  providers: [StringService],
  controllers: [StringController],
})
export class StringModule {}
