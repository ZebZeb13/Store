import { IsInt, IsString } from "class-validator";

export class CreateObjectTemplate {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;
}
