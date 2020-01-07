import { IsInt, IsString } from 'class-validator';
import { MainCreateLinker } from '../../../common/dto/mainCreateLinker.dto';

export class CreateStringLinker extends MainCreateLinker {
  @IsString()
  readonly value: string;
}
