import { IsInt, IsString, Min } from "class-validator";
import { MainCreateLinker } from "../../../common/dto/mainCreateLinker.dto";

export class CreateIntLinker extends MainCreateLinker {
  @IsInt()
  readonly value: number;
}
