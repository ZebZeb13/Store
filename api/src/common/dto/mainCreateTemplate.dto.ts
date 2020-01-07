import { IsInt, IsString } from "class-validator";

export class MainCreateTemplate {
  @IsString()
  readonly name: string;
}
