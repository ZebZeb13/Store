import { Controller, Get, Post, Body } from "@nestjs/common";
import { ObjectService } from "./object.service";
import { ObjectItem } from "./entities/item.entity";
import { ObjectTemplate } from "./entities/template.entity";
import { Category } from "../category/entities/category.entity";
import { CreateObjectItem } from "./dto/createItem.dto";
import { CreateObjectTemplate } from "./dto/createTemplate.dto";

@Controller("object")
export class ObjectController {
  constructor(private readonly objectService: ObjectService) {}

  @Get()
  findAll(): Promise<ObjectItem[]> {
    return this.objectService.findAll();
  }

  @Post()
  create(@Body() createObjectItem: CreateObjectItem) {
    return this.objectService.create(createObjectItem);
  }

  @Get("template")
  findAllTemplates(): Promise<ObjectTemplate[]> {
    return this.objectService.findAllTemplates();
  }

  @Post("template")
  createTemplate(@Body() createObjectTemplate: CreateObjectTemplate) {
    return this.objectService.createTemplate(createObjectTemplate);
  }
}
