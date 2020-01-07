import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';
import { StringService } from './string.service';
import { StringTemplate } from './entities/template.entity';
import { CreateStringTemplate } from './dto/createTemplate.dto';
import { CreateStringTemplateLinker } from './dto/createTemplateLinker.dto';
import { CreateStringLinker } from './dto/createLinker.dto';
import { ValidationPipe } from '../../common/pipes/validation.pipe';

@Controller('string')
export class StringController {
  constructor(private readonly stringService: StringService) {}

  @Get()
  findAll(): Promise<StringTemplate[]> {
    return this.stringService.findAll();
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) createStringTemplate: CreateStringTemplate,
  ) {
    return this.stringService.createTemplate(createStringTemplate);
  }

  @Post('templateLinker')
  async createTemplate(
    @Body(new ValidationPipe())
    createStringTemplateLinker: CreateStringTemplateLinker,
  ) {
    return this.stringService.createTemplateLinker(createStringTemplateLinker);
  }

  @Post('linker')
  async createLinker(@Body() createStringLinker: CreateStringLinker) {
    return this.stringService.createLinker(createStringLinker);
  }
}
