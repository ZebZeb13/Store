import { IsInt, IsString, IsNumber, Min } from "class-validator";
import { Transform } from "class-transformer";

export class CreateObjectItem {
  @IsNumber()
  @Min(0)
  @Transform(value => Number(value))
  readonly templateId: number;

  @IsString()
  readonly name: string;
}
