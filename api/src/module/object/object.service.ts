import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';

import { ObjectItem } from './entities/item.entity';
import { ObjectTemplate } from './entities/template.entity';

import { StringTemplate } from '../../module/string/entities/template.entity';
import { StringTemplateLinker } from '../../module/string/entities/templateLinker.entity';
import { StringLinker } from '../../module/string/entities/linker.entity';

import { IntTemplateLinker } from '../int/entities/templateLinker.entity';
import { IntTemplate } from '../int/entities/template.entity';

import { Category } from '../category/entities/category.entity';
import { ObjectItemInterface } from './interfaces/item.interfaces';
import { ObjectTemplateInterface } from './interfaces/template.interfaces';

@Injectable()
export class ObjectService {
  constructor(
    @InjectRepository(ObjectItem)
    private readonly objectRepository: Repository<ObjectItem>,

    @InjectRepository(StringTemplate)
    private readonly stringTemplateRepository: Repository<StringTemplate>,

    @InjectRepository(IntTemplate)
    private readonly IntTemplateRepository: Repository<IntTemplate>,

    @InjectRepository(ObjectTemplate)
    private readonly objectTemplateRepository: Repository<ObjectTemplate>,

    @InjectRepository(StringTemplateLinker)
    private readonly stringTemplateLinkerRepository: Repository<
      StringTemplateLinker
    >,

    @InjectRepository(StringLinker)
    private readonly stringLinkerRepository: Repository<StringLinker>,

    @InjectRepository(IntTemplateLinker)
    private readonly IntTemplateLinkerRepository: Repository<IntTemplateLinker>,
  ) {}

  async findAll(): Promise<ObjectItem[]> {
    return await this.objectRepository.find({
      relations: [
        'template',
        'strings',
        'strings.template',
        'strings.template.template',
        'ints',
      ],
      order: {
        id: 'DESC',
      },
    });
  }

  async findAllTemplates(): Promise<ObjectTemplate[]> {
    return await this.objectTemplateRepository.find({
      order: {
        id: 'DESC',
      },
      relations: [
        'categories',
        'stringTemplates',
        'stringTemplates.template',
        'intTemplates',
        'intTemplates.template',
      ],
    });
  }

  async createTemplate(objectTemplate: ObjectTemplateInterface) {
    const newObjectTemplate = new ObjectTemplate();
    newObjectTemplate.name = objectTemplate.name;
    newObjectTemplate.description = objectTemplate.description;
    return this.objectTemplateRepository.save(newObjectTemplate);
  }

  async create(objectItem: ObjectItemInterface) {
    const objectTemplate = await this.objectTemplateRepository.findOne(
      objectItem.templateId,
    );
    if (!objectTemplate) {
      throw new HttpException('Object template not found', HttpStatus.CONFLICT);
    }
    const newObjectItem = new ObjectItem();
    newObjectItem.name = objectItem.name;
    newObjectItem.template = objectTemplate;
    return this.objectRepository.save(newObjectItem);
  }
}
