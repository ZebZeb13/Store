import { IsInt, IsString, Min, IsNumber } from "class-validator";
import { Transform } from "class-transformer";

export class MainCreateTemplateLinker {
  @IsNumber()
  @Min(0)
  @Transform(value => Number(value))
  readonly templateId: number;

  @IsNumber()
  @Min(0)
  @Transform(value => Number(value))
  readonly objectTemplateId: number;

  @IsNumber()
  @Min(0)
  @Transform(value => Number(value))
  readonly field: number;
}
