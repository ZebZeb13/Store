import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import IStringTemplateLinker from './interfaces/templateLinker.interfaces';
import IStringTemplate from './interfaces/template.interfaces';
import { StringTemplate } from './entities/template.entity';
import { StringTemplateLinker } from './entities/templateLinker.entity';
import { StringLinker } from './entities/linker.entity';
import { ObjectTemplate } from '../../module/object/entities/template.entity';
import IStringLinker from './interfaces/linker.interfaces';
import { ObjectItem } from '../../module/object/entities/item.entity';

@Injectable()
export class StringService {
  constructor(
    @InjectRepository(ObjectItem)
    private readonly objectRepository: Repository<ObjectItem>,

    @InjectRepository(ObjectTemplate)
    private readonly objectTemplateRepository: Repository<ObjectTemplate>,

    @InjectRepository(StringTemplate)
    private readonly stringTemplateRepository: Repository<StringTemplate>,

    @InjectRepository(StringTemplateLinker)
    private readonly stringTemplateLinkerRepository: Repository<
      StringTemplateLinker
    >,

    @InjectRepository(StringLinker)
    private readonly stringLinkerRepository: Repository<StringLinker>,
  ) { }

  async findAll(): Promise<StringTemplate[]> {
    return await this.stringTemplateRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async createTemplate(stringTemplate: IStringTemplate) {
    const newStringTemplate = new StringTemplate();
    newStringTemplate.name = stringTemplate.name;
    return this.stringTemplateRepository.save(newStringTemplate);
  }

  async createTemplateLinker(
    stringTemplateLinker: IStringTemplateLinker,
  ) {
    const objectTemplate = await this.objectTemplateRepository.findOne(
      stringTemplateLinker.objectTemplateId,
      {
        relations: ['stringTemplates'],
      },
    );
    if (!objectTemplate) {
      throw new HttpException('Object template not found', HttpStatus.CONFLICT);
    }
    const isFieldDefine = objectTemplate.stringTemplates.find(string => {
      return string.field == stringTemplateLinker.field;
    });
    if (isFieldDefine) {
      throw new HttpException(
        'This field is already exist',
        HttpStatus.CONFLICT,
      );
    }

    const stringTemplate = await this.stringTemplateRepository.findOne(
      stringTemplateLinker.templateId,
    );
    if (!stringTemplateLinker) {
      throw new HttpException('String template not found', HttpStatus.CONFLICT);
    }
    const newStringLinker = new StringTemplateLinker();
    newStringLinker.objectTemplate = objectTemplate;
    newStringLinker.template = stringTemplate;
    newStringLinker.field = stringTemplateLinker.field;
    return this.stringTemplateLinkerRepository.save(newStringLinker);
  }

  async createLinker(stringLinker: IStringLinker) {
    const object = await this.objectRepository.findOne(stringLinker.objectId, {
      relations: [
        'template',
        'template.stringTemplates',
        'strings',
        'strings.template',
      ],
    });
    if (!object) {
      throw new HttpException('Object not found', HttpStatus.CONFLICT);
    }
    if (object.template.stringTemplates) {
      const isInTemplate = await object.template.stringTemplates.find(
        template => {
          return template.id == stringLinker.templateId;
        },
      );
      if (!isInTemplate) {
        throw new HttpException(
          'This field is not in template',
          HttpStatus.CONFLICT,
        );
      }
    }

    const isInSet = await object.strings.find(string => {
      return string.template.id == stringLinker.templateId;
    });
    if (isInSet) {
      throw new HttpException('This field already set', HttpStatus.CONFLICT);
    }

    const stringTemplate = await this.stringTemplateLinkerRepository.findOne(
      stringLinker.templateId,
    );
    if (!stringTemplate) {
      throw new HttpException('Template not found', HttpStatus.CONFLICT);
    }

    const newStringLinker = new StringLinker();
    newStringLinker.object = object;
    newStringLinker.template = stringTemplate;
    newStringLinker.value = stringLinker.value;
    return this.stringLinkerRepository.save(newStringLinker);
  }
}
