import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';

import { ObjectItem } from '../object/entities/item.entity';
import { ObjectTemplate } from '../object/entities/template.entity';

import { IntUnity } from './entities/unity.entity';
import { IntLinker } from './entities/linker.entity';
import { IntTemplateLinker } from './entities/templateLinker.entity';
import { IntTemplate } from './entities/template.entity';

import { IntTemplateInterface } from './interfaces/template.interfaces';
import { IntTemplateLinkerInterface } from './interfaces/templateLinker.interfaces';
import { IntLinkerInterface } from './interfaces/linker.interfaces';

@Injectable()
export class IntService {
  constructor(
    @InjectRepository(ObjectItem)
    private readonly objectRepository: Repository<ObjectItem>,

    @InjectRepository(ObjectTemplate)
    private readonly objectTemplateRepository: Repository<ObjectTemplate>,

    @InjectRepository(IntTemplate)
    private readonly intTemplateRepository: Repository<IntTemplate>,

    @InjectRepository(IntTemplateLinker)
    private readonly intTemplateLinkerRepository: Repository<IntTemplateLinker>,

    @InjectRepository(IntLinker)
    private readonly intLinkerRepository: Repository<IntLinker>,

    @InjectRepository(IntUnity)
    private readonly intUnityRepository: Repository<IntUnity>,
  ) {}

  async findAll(): Promise<IntTemplate[]> {
    return await this.intTemplateRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async findAllLinker(): Promise<IntLinker[]> {
    return await this.intLinkerRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async createTemplate(intTemplate: IntTemplateInterface) {
    const newIntTemplate = new IntTemplate();
    newIntTemplate.name = intTemplate.name;
    await this.intTemplateRepository.save(newIntTemplate);
  }

  async createTemplateLinker(intTemplateLinker: IntTemplateLinkerInterface) {
    const objectTemplate = await this.objectTemplateRepository.findOne(
      intTemplateLinker.objectTemplateId,
      {
        relations: ['intTemplates'],
      },
    );
    if (!objectTemplate) {
      throw new HttpException('Object template not found', HttpStatus.CONFLICT);
    }

    const isFieldDefine = objectTemplate.stringTemplates.find(int => {
      return int.field == intTemplateLinker.field;
    });
    if (isFieldDefine) {
      throw new HttpException(
        'This field is already exist',
        HttpStatus.CONFLICT,
      );
    }

    const intTemplate = await this.intTemplateRepository.findOne(
      intTemplateLinker.templateId,
    );
    if (!intTemplate) {
      throw new HttpException('Int template not found', HttpStatus.CONFLICT);
    }
    const newIntLinker = new IntTemplateLinker();
    newIntLinker.objectTemplate = objectTemplate;
    newIntLinker.template = intTemplate;
    newIntLinker.field = intTemplateLinker.field;
    return this.intTemplateLinkerRepository.save(newIntLinker);
  }

  async createLinker(intLinker: IntLinkerInterface) {
    const object = await this.objectRepository.findOne(intLinker.objectId);
    if (!object) {
      throw new HttpException('Object not found', HttpStatus.CONFLICT);
    }
    const isInTemplate = await object.template.stringTemplates.find(
      template => {
        return template.id == intLinker.templateId;
      },
    );
    if (!isInTemplate) {
      throw new HttpException(
        'This field is not in template',
        HttpStatus.CONFLICT,
      );
    }
    const isInSet = await object.strings.find(string => {
      return string.template.id === intLinker.templateId;
    });
    if (isInSet) {
      throw new HttpException('This field already set', HttpStatus.CONFLICT);
    }

    const intTemplate = await this.intTemplateLinkerRepository.findOne(
      intLinker.templateId,
      {
        relations: [
          'template',
          'template.stringTemplates',
          'strings',
          'strings.template',
        ],
      },
    );
    if (!intTemplate) {
      throw new HttpException('Template not found', HttpStatus.CONFLICT);
    }
    const newIntLinker = new IntLinker();
    newIntLinker.object = object;
    newIntLinker.template = intTemplate;
    newIntLinker.value = intLinker.value;
    return this.intTemplateLinkerRepository.save(newIntLinker);
  }
}
