import { Controller, Get, Post, Body } from "@nestjs/common";
import { IntService } from "./int.service";
import { IntTemplate } from "./entities/template.entity";
import { CreateIntTemplate } from "./dto/createTemplate.dto";
import { CreateIntTemplateLinker } from "./dto/createTemplateLinker.dto";
import { CreateIntLinker } from "./dto/createLinker.dto";

@Controller("int")
export class IntController {
  constructor(private readonly intService: IntService) {}

  @Get()
  findAll(): Promise<IntTemplate[]> {
    return this.intService.findAll();
  }

  @Post()
  async create(@Body() createIntTemplate: CreateIntTemplate) {
    return this.intService.createTemplate(createIntTemplate);
  }

  @Post("templateLinker")
  async createTemplate(
    @Body() createIntTemplateLinker: CreateIntTemplateLinker
  ) {
    return this.intService.createTemplateLinker(createIntTemplateLinker);
  }

  @Post("linker")
  async createLinker(@Body() createIntLinker: CreateIntLinker) {
    return this.intService.createLinker(createIntLinker);
  }
}
